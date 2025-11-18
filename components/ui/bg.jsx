"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------
   SECTION CONFIG — CONTROLS EVERYTHING
------------------------------------------------- */
const sectionConfig = {
    hero: {
        position: [0, -1, 0],
        scale: 100,
        rotation: [0, 0, 0],
        animations: ["stand1", "stand2", "ready", "stand3"]
    },
    about: {
        position: [-1.7, -0.8, 0],
        scale: 90,
        rotation: [0, Math.PI * 0.3, 0],
        animations: ["walk","stand1"]
    },
    "about-1": {
        position: [0, 0, 0],
        scale: 80,
        rotation: [0, Math.PI * 0.1, 0],
        animations: ["ready","stand2"]
    },
    "about-2": {
        position: [0, -2, 0],
        scale: 150,
        rotation: [0, -Math.PI*.3, 0],
        animations: ["melee1", "melee2"]
    },
    contact: {
        position: [0, -1, 0],
        scale: 100,
        rotation: [0, -Math.PI * 0.3, 0],
        animations: ["stand1","walk"]
    },
    footer: {
        position: [0, -1, 0],
        scale: 100,
        rotation: [0, 0, 0],
        animations: ["stand1", "stand2", "stand3"]
    }
};

/* -------------------------------------------------
    SECTION OBSERVER
------------------------------------------------- */
export function useSectionObserver(sectionIds = []) {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (!Array.isArray(sectionIds) || sectionIds.length === 0) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return activeSection;
}

/* -------------------------------------------------
   PLAY ANIMATIONS CLEANLY (NO OVERLAP)
------------------------------------------------- */
function playAnimations(animationNames, actions, cleanerRef) {
    if (!animationNames?.length) return;
    if (!actions) return;

    let index = 0;

    const playNext = () => {
        const name = animationNames[index];
        const action = actions[name];

        if (!action) return;

        action.reset();
        action.fadeIn(0.3);
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();

        const duration = action.getClip().duration * 1000;

        cleanerRef.current = setTimeout(() => {
            action.fadeOut(0.2);
            index = (index + 1) % animationNames.length;
            playNext();
        }, duration);
    };

    playNext();
}

/* -------------------------------------------------
   CHARACTER — SMOOTH LERP EVERYTHING
------------------------------------------------- */
function Character({ position, scale, rotation, animationList }) {
    const ref = useRef();
    const cleaner = useRef(null);

    const { scene, animations } = useGLTF("/models/char.glb");
    const { actions } = useAnimations(animations, ref);

    /* Smooth LERPing */
    useFrame(() => {
        if (!ref.current) return;

        // Smooth position
        ref.current.position.lerp(new THREE.Vector3(...position), 0.1);

        // Smooth scale
        const currentScale = ref.current.scale.x;
        const targetScale = scale;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
        ref.current.scale.set(newScale, newScale, newScale);

        // Smooth rotation
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rotation[0], 0.1);
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rotation[1], 0.1);
        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, rotation[2], 0.1);
    });

    /* Animations handler */
    useEffect(() => {
        if (!animations.length || !animationList?.length) return;

        if (cleaner.current) clearTimeout(cleaner.current);

        playAnimations(animationList, actions, cleaner);

        return () => clearTimeout(cleaner.current);
    }, [animationList, actions]);

    return (
        <group ref={ref}>
            <primitive object={scene} />
        </group>
    );
}

/* -------------------------------------------------
   MAIN SCENE — Controls Character Based on Section
------------------------------------------------- */
export default function HeroBackground3DFull() {
    const activeSection = useSectionObserver([
        "hero",
        "about",
        "about-1",
        "about-2",
        "contact",
        "footer"
    ]);

    const config = sectionConfig[activeSection] ?? sectionConfig.hero;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <Character
                    position={config.position}
                    scale={config.scale}
                    rotation={config.rotation}
                    animationList={config.animations}
                />
            </Canvas>
        </div>
    );
}
