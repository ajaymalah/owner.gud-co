"use client"; // if using Next.js 13+

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { CCDIKSolver, CCDIKHelper } from "three/addons/animation/CCDIKSolver.js";

export default function Background3D() {
  const mountRef = useRef();

  useEffect(() => {
    let scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.17);
    scene.background = new THREE.Color(0xffffff);

    let camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.001,
      5000
    );
    camera.position.set(0.97, 1.1, 0.73);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 8);
    scene.add(ambientLight);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.enabled = false; // optional: background moves automatically only

    const OOI = {};
    let IKSolver;
    const v0 = new THREE.Vector3();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load("models/gltf/kira.glb", (gltf) => {
      gltf.scene.traverse((n) => {
        if (n.name === "head") OOI.head = n;
        if (n.name === "lowerarm_l") OOI.lowerarm_l = n;
        if (n.name === "Upperarm_l") OOI.Upperarm_l = n;
        if (n.name === "hand_l") OOI.hand_l = n;
        if (n.name === "target_hand_l") OOI.target_hand_l = n;
        if (n.name === "boule") OOI.sphere = n;
        if (n.name === "Kira_Shirt_left") OOI.kira = n;
      });
      scene.add(gltf.scene);

      // IK setup
      const iks = [
        {
          target: 22,
          effector: 6,
          links: [
            {
              index: 5,
              rotationMin: new THREE.Vector3(1.2, -1.8, -0.4),
              rotationMax: new THREE.Vector3(1.7, -1.1, 0.3),
            },
            {
              index: 4,
              rotationMin: new THREE.Vector3(0.1, -0.7, -1.8),
              rotationMax: new THREE.Vector3(1.1, 0, -1.4),
            },
          ],
        },
      ];
      IKSolver = new CCDIKSolver(OOI.kira, iks);
      const helper = new CCDIKHelper(OOI.kira, iks, 0.01);
      scene.add(helper);
    });

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      if (OOI.sphere && OOI.head) {
        OOI.sphere.getWorldPosition(v0);
        OOI.head.lookAt(v0);
        OOI.head.rotation.set(
          OOI.head.rotation.x,
          OOI.head.rotation.y + Math.PI,
          OOI.head.rotation.z
        );
      }
      if (IKSolver) IKSolver.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-screen h-screen -z-10" />;
}
