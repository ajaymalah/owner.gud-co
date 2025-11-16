"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function HeroBackground3D() {
  const mountRef = useRef(null);
  const characterRef = useRef(null);
  const mixerRef = useRef(null);
  const planetsRef = useRef([]);
  const skills = useRef([
    "Spring Boot", "Flutter", "NestJS", "React", "GitHub",
    "Microservices",  "Bloc", ,
  ]);

  const createPlanetTexture = (text) => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createRadialGradient(size/2, size/2, 10, size/2, size/2, size/2);
    grad.addColorStop(0, "rgba(255,200,100,0.9)");
    grad.addColorStop(1, "rgba(255,120,50,0.3)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size/2, size/2);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    // Remove background color so page theme shows through
    // scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableRotate = false;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(3, 6, 5);
    scene.add(dirLight);
    const fillLight = new THREE.PointLight(0xffffff, 0.4);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    loader.load("/models/char.glb", (gltf) => {
      const character = gltf.scene;
      characterRef.current = character;
      character.position.y = 0;
      scene.add(character);

      const mixer = new THREE.AnimationMixer(character);
      mixerRef.current = mixer;

      const fly = gltf.animations.find(a => a.name.toLowerCase() === "fly-state");
      if(fly){
        const flyAction = mixer.clipAction(fly);
        flyAction.setLoop(THREE.LoopRepeat);
        flyAction.play();
      }
    });

    const createPlanets = () => {
      planetsRef.current.forEach(p => scene.remove(p));
      planetsRef.current = [];
      const orbitRadius = 1.2;
      skills.current.forEach((skill, i) => {
        const geometry = new THREE.SphereGeometry(0.12, 32, 32);
        const texture = createPlanetTexture(skill);
        const material = new THREE.MeshPhysicalMaterial({
          map: texture,
          transparent: true,
          opacity: 1,
          roughness: 0.2,
          metalness: 0.1,
          transmission: 0.6,
          clearcoat: 0.5
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.userData = {
          angle: (i / skills.current.length) * Math.PI * 2,
          radius: orbitRadius,
          speed: 0.15 + i * 0.005,
          state: "orbit"
        };
        scene.add(planet);
        planetsRef.current.push(planet);
      });
    };
    createPlanets();

    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();

      if(characterRef.current){
        const t = Date.now()*0.001;
        characterRef.current.position.y = Math.sin(t*1.5)*0.05;
      }

      planetsRef.current.forEach(planet => {
        planet.userData.angle += planet.userData.speed * delta;
        const x = Math.cos(planet.userData.angle) * planet.userData.radius;
        const z = Math.sin(planet.userData.angle) * planet.userData.radius;
        planet.position.set(x, 0.5, z);
      });

      mixerRef.current?.update(delta);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10"/>;
}
