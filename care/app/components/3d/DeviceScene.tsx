'use client'; // Required for R3F hooks

import React, { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Text3D, Center, ScrollControls, useScroll } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three'; // Optional: for spring animations

// --- Placeholder Geometry ---
// In a real scenario, load a GLTF model using useGLTF
function DeviceModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const redLightsRef = useRef<THREE.Group>(null);
  const bodyTexture = useTexture('/textures/placeholder_purple_brushed.jpg'); // Placeholder
  const scaleTexture = useTexture('/textures/placeholder_scale.png'); // Placeholder

  // Initial rotation
  const initialRotationY = Math.PI / 10; // Slight initial tilt
  const initialRotationX = Math.PI / 12;

  // Animation state
  const [hasRotated, setHasRotated] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);

  // --- Materials ---
  const bodyMaterial = new THREE.MeshStandardMaterial({
    map: bodyTexture, // Use loaded texture
    color: 0x8a2be2,
    metalness: 0.2,
    roughness: 0.6,
  });
  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
  const scaleMaterial = new THREE.MeshBasicMaterial({ map: scaleTexture, transparent: true, side: THREE.DoubleSide });
  const logoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.3 });

  // --- Geometry Dimensions ---
  const bodyWidth = 3;
  const bodyHeight = 3;
  const bodyDepth = 1.5;
  const legRadius = 0.15;
  const legHeight = 1.5;
  const windowWidth = 0.5;
  const windowHeight = 2.5;
  const windowDepth = 0.1;

  // --- Leg Positions ---
  const legPositions = [
    { x: -0.8, z: 0.5 }, { x: 0, z: 0.5 }, { x: 0.8, z: 0.5 },
    { x: -0.8, z: -0.5 }, { x: 0, z: -0.5 }, { x: 0.8, z: -0.5 }
  ];

  // --- Scroll Animation ---
  useFrame((state, delta) => {
    if (!groupRef.current || !redLightsRef.current) return;

    const scrollOffset = scrollProgress.current; // Get current scroll offset (0 to 1)

    // --- Rotation ---
    // Rotate further when scroll passes 0.5, only once
    const targetRotationY = scrollOffset > 0.5 ? initialRotationY + Math.PI / 6 : initialRotationY;
    // Simple lerp for smooth rotation (consider useSpring for physics)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);

    // --- Light Activation ---
    // Turn on lights when scroll passes 0.5
    const targetIntensity = scrollOffset > 0.5 ? 5 : 0;
    redLightsRef.current.children.forEach(light => {
      if (light instanceof THREE.PointLight) {
        light.intensity = THREE.MathUtils.lerp(light.intensity, targetIntensity, 0.1);
      }
    });
  });

  return (
    <group ref={groupRef} rotation-y={initialRotationY} rotation-x={initialRotationX}>
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} material={bodyMaterial}>
        <boxGeometry args={[bodyWidth, bodyHeight, bodyDepth]} />
      </mesh>

      {/* Measurement Window */}
      <mesh
        material={windowMaterial}
        position={[bodyWidth / 2 - windowWidth / 2 - 0.1, 0, bodyDepth / 2 + windowDepth / 2 + 0.01]}
        rotation-y={Math.PI / 2}
      >
        <boxGeometry args={[windowWidth, windowHeight, windowDepth]} />
        {/* Scale Plane */}
        <mesh material={scaleMaterial} position-z={windowDepth / 2 + 0.01}>
          <planeGeometry args={[windowWidth * 0.9, windowHeight * 0.9]} />
        </mesh>
      </mesh>

      {/* Logo - Requires a font JSON file */}
      {/* Replace 'path/to/your/font.json' */}
      <Suspense fallback={null}>
        <Center position={[-0.3, bodyHeight / 2 - 0.7, bodyDepth / 2 + 0.02]}>
           {/* Make sure font path is correct in /public */}
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json" // Placeholder path
            size={0.5}
            height={0.05}
            curveSegments={12}
            bevelEnabled={false}
            material={logoMaterial}
          >
            {`C°`}
          </Text3D>
        </Center>
      </Suspense>


      {/* Legs Group */}
      <group position={[0, -bodyHeight / 2 - legHeight / 2, 0]}>
        {legPositions.map((pos, i) => (
          <mesh key={i} position={[pos.x, 0, pos.z]} material={legMaterial} castShadow>
            <cylinderGeometry args={[legRadius, legRadius, legHeight, 16]} />
          </mesh>
        ))}
      </group>

      {/* Red Lights Group - Lights are positioned relative to scene origin */}
      <group ref={redLightsRef}>
        {legPositions.map((pos, i) => (
          <pointLight
            key={i}
            position={[pos.x, -bodyHeight / 2 - legHeight, pos.z]} // Position below legs
            color={0xff0000}
            intensity={0} // Start off
            distance={5}
            castShadow
          />
        ))}
      </group>
    </group>
  );
}

// --- Main Scene Component ---
export function DeviceScene() {
  const scroll = useScroll(); // Hook from Drei to get scroll data from ScrollControls

  // We pass the scroll ref down so the model can react to it
  const scrollProgressRef = useRef(0);
  useFrame(() => {
    scrollProgressRef.current = scroll.offset; // Update ref in animation loop
  });

  return (
    <div style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      {/* Make canvas fill parent, absolute positioned */}
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 75 }}>
        <color attach="background" args={[0xe0e0e0]} /> {/* Light grey background */}
        <ambientLight intensity={1.5} /> {/* Adjusted intensity */}
        <directionalLight position={[5, 10, 7.5]} intensity={0.8} castShadow /> {/* Adjusted intensity */}

        {/* ScrollControls defines the scrollable area, pages=2 means scroll height = 2x viewport */}
        <ScrollControls pages={2} damping={0.25}>
          <Suspense fallback={null}>
            {/* Pass scroll ref to model */}
            <DeviceModel scrollProgress={scrollProgressRef} />
          </Suspense>
        </ScrollControls>

        {/* Ground Plane */}
        <mesh rotation-x={-Math.PI / 2} position-y={-3.01} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={0xcccccc} roughness={0.8} />
        </mesh>

        {/* Controls */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
} 