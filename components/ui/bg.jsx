"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Character() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/char.glb");
  const { actions } = useAnimations(animations, group);

  const idleAnimations = ["stand1", "stand2", "stand3"];
  const meleeAnimations = ["malee1", "malee1upper", "malee2"];
  const currentAction = useRef(null);
  const isDead = useRef(false);
  const isIdle = useRef(false);

  const modelScale = useRef(200);
  const originalPos = new THREE.Vector3(0, -1, 0);
  const lastMoveTime = useRef(Date.now());
  const targetPos = useRef(originalPos.clone());
  const defaultRotation = new THREE.Euler(0, 0, 0);

  const idleIndex = useRef(0); // tracks idle animation
  const meleeIndex = useRef(0); // tracks melee animation
  let idleTimeout = useRef(null);

  // Switch animation
  const switchAnimation = (name, { clamp = false, duration = null, onFinish } = {}) => {
    if (!actions || isDead.current) return;
    if (currentAction.current === name) return;

    if (currentAction.current) actions[currentAction.current]?.fadeOut(0.3);

    const action = actions[name];
    if (!action) return;

    action.reset().fadeIn(0.3).play();
    action.loop = clamp ? THREE.LoopOnce : THREE.LoopRepeat;

    currentAction.current = name;

    if (duration) {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        if (onFinish) onFinish();
      }, duration);
    }
  };

  // Sequential idle
  const playNextIdle = () => {
    if (isDead.current || isIdle.current) return;

    isIdle.current = true;
    modelScale.current = 150;

    const next = idleAnimations[idleIndex.current];
    idleIndex.current = (idleIndex.current + 1) % idleAnimations.length;

    switchAnimation(next, {
      clamp: false,
      duration: 5000,
      onFinish: () => {
        isIdle.current = false;
        playNextIdle(); // continue idle loop
      },
    });
  };

  const playRun = () => {
    modelScale.current = 40;
    isIdle.current = false;
    switchAnimation("run");
  };

  // Sequential melee on every click
  const playNextMelee = () => {
    if (isDead.current) return;

    isIdle.current = false;
    modelScale.current = 40;

    const next = meleeAnimations[meleeIndex.current];
    meleeIndex.current = (meleeIndex.current + 1) % meleeAnimations.length;

    switchAnimation(next, { clamp: true, duration: 5000, onFinish: playNextIdle });
  };

  const playDeath = () => {
    if (isDead.current) return;
    isIdle.current = false;
    switchAnimation("death", { clamp: true, duration: 5000, onFinish: playNextIdle });
    isDead.current = true;
  };

  // Mouse tracking
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

  // Idle timer: return to original position if no movement
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (!isDead.current && now - lastMoveTime.current > 3000) {
        targetPos.current.copy(originalPos);
      }
      requestAnimationFrame(checkIdle);
    };
    checkIdle();
  }, []);

  // Click handler: melee animation
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

  // Movement & rotation
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
      // Idle: reset rotation
      playNextIdle();
      group.current.rotation.x += (defaultRotation.x - group.current.rotation.x) * 0.1;
      group.current.rotation.y += (defaultRotation.y - group.current.rotation.y) * 0.1;
      group.current.rotation.z += (defaultRotation.z - group.current.rotation.z) * 0.1;
    }

    group.current.scale.setScalar(modelScale.current);
  });

  // Shadows & start idle immediately
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
    <group ref={group} scale={modelScale.current} position={originalPos}>
      <primitive object={scene} />
    </group>
  );
}

// Smooth camera controller
function CameraController() {
  const { camera } = useThree();
  const defaultPos = useRef(new THREE.Vector3(0, 3, 12));

  useFrame(() => {
    camera.position.lerp(defaultPos.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroBackground3DFull() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 3, 12], fov: 20 }} style={{ pointerEvents: "auto" }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Character />
        <CameraController />
      </Canvas>
    </div>
  );
}
