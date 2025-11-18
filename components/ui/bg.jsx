"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, forwardRef } from "react";
import * as THREE from "three";

// -------------------- CHARACTER STATES --------------------
const CHARACTER_STATE = {
  IDLE: "idle",
  RUN: "run",
  MELEE: "melee",
  DEATH: "death",
  READY: "ready",
};

// -------------------- CHARACTER COMPONENT --------------------
const Character = forwardRef(function Character(_, ref) {
  const group = useRef();
  if (ref) ref.current = group.current; // forward ref outward

  const { scene, animations } = useGLTF("/models/char.glb");
  const { actions } = useAnimations(animations, group);

  const state = useRef(CHARACTER_STATE.IDLE);
  const currentAction = useRef(null);

  const idleAnimations = ["stand1", "stand2", "stand3"];
  const meleeAnimations = ["malee1", "malee1upper", "malee2"];

  const idleIndex = useRef(0);
  const meleeIndex = useRef(0);

  const modelScale = useRef(200);
  const targetPos = useRef(new THREE.Vector3(0, -1, 0));
  const originalPos = new THREE.Vector3(0, -1, 0);
  const lastMoveTime = useRef(Date.now());
  const defaultRotation = new THREE.Euler(0, 0, 0);

  const idleTimeout = useRef(null);

  const setState = (newState) => {
    state.current = newState;
  };

  // -------------------- Animation Switching --------------------
  const switchAnimation = (name, { clamp = false, duration = null, onFinish } = {}) => {
    if (!actions) return;
    if (state.current === CHARACTER_STATE.DEATH && name !== "death") return;
    if (currentAction.current === name) return;

    if (currentAction.current && actions[currentAction.current]) {
      actions[currentAction.current].fadeOut(0.3);
    }

    const action = actions[name];
    if (!action) return;

    action.reset().fadeIn(0.3).play();
    action.loop = clamp ? THREE.LoopOnce : THREE.LoopRepeat;
    currentAction.current = name;

    if (duration) {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => onFinish && onFinish(), duration);
    }
  };

  // -------------------- Idle Cycle --------------------
  const playNextIdle = () => {
    if (state.current === CHARACTER_STATE.DEATH) return;

    setState(CHARACTER_STATE.IDLE);
    modelScale.current = 150;

    const next = idleAnimations[idleIndex.current];
    idleIndex.current = (idleIndex.current + 1) % idleAnimations.length;

    switchAnimation(next, {
      duration: 5000,
      onFinish: playNextIdle,
    });
  };

  // -------------------- Run Animation --------------------
  const playRun = () => {
    if (state.current === CHARACTER_STATE.DEATH) return;

    if (state.current !== CHARACTER_STATE.RUN) {
      modelScale.current = 40;
      setState(CHARACTER_STATE.RUN);
      switchAnimation("run");
    }
  };

  // -------------------- Melee Attack --------------------
  const playNextMelee = () => {
    if (state.current === CHARACTER_STATE.DEATH) return;

    setState(CHARACTER_STATE.MELEE);
    modelScale.current = 40;

    const next = meleeAnimations[meleeIndex.current];
    meleeIndex.current = (meleeIndex.current + 1) % meleeAnimations.length;

    switchAnimation(next, {
      clamp: true,
      duration: 5000,
      onFinish: playNextIdle,
    });
  };

  // -------------------- Death Animation --------------------
  const playDeath = () => {
    if (state.current === CHARACTER_STATE.DEATH) return;

    setState(CHARACTER_STATE.DEATH);

    switchAnimation("death", {
      clamp: true,
      duration: 5000,
      onFinish: () => {
        setState(CHARACTER_STATE.IDLE);
        playNextIdle();
      },
    });
  };

  // -------------------- Cursor Follow --------------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 10 - 5;
      const y = -(e.clientY / window.innerHeight) * 6 + 3;

      targetPos.current.set(x, -1 + y, 0);
      lastMoveTime.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // -------------------- Auto Return to Idle --------------------
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (state.current !== CHARACTER_STATE.DEATH && now - lastMoveTime.current > 3000) {
        targetPos.current.copy(originalPos);
      }
      requestAnimationFrame(checkIdle);
    };
    checkIdle();
  }, []);

  // -------------------- Click/Double-Click --------------------
  useEffect(() => {
    const handleClick = () => playNextMelee();
    const handleDoubleClick = () => playDeath();

    window.addEventListener("click", handleClick);
    window.addEventListener("dblclick", handleDoubleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  // -------------------- Movement + Animation Logic --------------------
  useFrame(() => {
    if (!group.current) return;

    const pos = group.current.position;
    const direction = new THREE.Vector3().subVectors(targetPos.current, pos);
    const distance = direction.length();

    if (distance > 0.05) {
      direction.normalize();
      pos.lerp(targetPos.current, 0.05);

      const targetQuaternion = new THREE.Quaternion();
      const lookAtPos = pos.clone().add(direction);

      group.current.lookAt(lookAtPos);
      targetQuaternion.copy(group.current.quaternion);
      group.current.quaternion.slerp(targetQuaternion, 0.1);

      playRun();
    } else {
      if (state.current !== CHARACTER_STATE.IDLE) {
        playNextIdle();
      }

      group.current.rotation.x += (defaultRotation.x - group.current.rotation.x) * 0.1;
      group.current.rotation.y += (defaultRotation.y - group.current.rotation.y) * 0.1;
      group.current.rotation.z += (defaultRotation.z - group.current.rotation.z) * 0.1;
    }

    group.current.scale.setScalar(modelScale.current);
  });

  // -------------------- Shadows + Start Idle --------------------
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    playNextIdle();
  }, [scene]);

  return (
    <group ref={group} position={originalPos} scale={modelScale.current}>
      <primitive object={scene} />
    </group>
  );
});

// -------------------- CINEMATIC CAMERA --------------------
function CinematicCamera({ targetRef }) {
  const { camera } = useThree();
  const offset = new THREE.Vector3(0, 3, 12);
  const lookAhead = new THREE.Vector3(0, 1, 0);

  useFrame(() => {
    if (!targetRef.current) return;

    const charPos = targetRef.current.position.clone();
    const desiredPos = charPos.clone().add(offset);

    camera.position.lerp(desiredPos, 0.05);

    const lookTarget = charPos.clone().add(lookAhead);
    camera.lookAt(lookTarget);
  });

  return null;
}

// -------------------- SCENE --------------------
export default function HeroBackground3DFull() {
  const heroRef = useRef();

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 3, 12], fov: 20 }} style={{ pointerEvents: "auto" }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Character ref={heroRef} />
        <CinematicCamera targetRef={heroRef} />
      </Canvas>
    </div>
  );
}
