'use client'; // Required for R3F hooks

import React, { useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Load the GLTF model
function DeviceModel({ pageScrollProgress }: { pageScrollProgress: number }) {
  // Path relative to the /public directory
  const modelPath = '/3d/justtheproduct.glb'; 
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  // Ref for point lights, might need adjustment based on model structure
  const redLightsRef = useRef<THREE.Group>(null); 

  // Initial rotation (adjust as needed for the loaded model)
  const initialRotationY = Math.PI / 10;
  const initialRotationX = Math.PI / 12;

  // --- Page Scroll Animation ---
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Use the passed-in pageScrollProgress (expected to be 0 to 1 relative to some scroll range)
    const scrollOffset = pageScrollProgress;

    // --- Rotation ---
    const targetRotationY = initialRotationY + (scrollOffset * Math.PI); // Increase rotation range based on page scroll
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05); // Maybe slower lerp

    // --- Light Activation ---
    // Example: Activate lights based on page scroll position
    if (redLightsRef.current) {
     const targetIntensity = scrollOffset > 0.2 ? 1.5 : 0; // Turn on earlier in the page scroll?
     redLightsRef.current.children.forEach(light => {
       if (light instanceof THREE.PointLight) {
         light.intensity = THREE.MathUtils.lerp(light.intensity, targetIntensity, 0.1);
       }
     });
   }
  });
  
  // --- Model Setup --- 
  // Clone the scene to avoid modifying the original cache
  const clonedScene = scene.clone();

  useEffect(() => {
    // Optional: Set shadows for all meshes in the loaded model
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Optional: Adjust materials if needed
        // child.material.metalness = ... 
      }
    });
  }, [clonedScene]);

  return (
    // Use the groupRef for overall transformations and animations
    <group ref={groupRef} rotation-y={initialRotationY} rotation-x={initialRotationX} dispose={null}>
      {/* Render the loaded scene */}
      <primitive object={clonedScene} />
      
      {/* Optional: Add the separate red lights group reacting to scroll */}
      {/* Adjust positions based on your model */}
      <group ref={redLightsRef}>
         {/* Example light positions - ADJUST THESE based on your model */}
         <pointLight position={[0, 0.5, 1]} color={0xff0000} intensity={0} distance={3} />
         <pointLight position={[0, -0.5, 1]} color={0xff0000} intensity={0} distance={3} />
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('/3d/justtheproduct.glb');

// --- Main Scene Component ---
export function DeviceScene({ pageScrollProgress }: { pageScrollProgress: number }) {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 0 }}>
      <Canvas shadows camera={{ position: [0, 1, 6], fov: 50 }}> {/* Adjusted camera */}
        {/* Removed explicit background color to let Environment handle it */}
        {/* <color attach="background" args={[0xe0e0e0]} /> */}
        
        {/* Adjusted lights */}
        <ambientLight intensity={0.4} /> 
        <directionalLight 
           position={[8, 10, 5]} 
           intensity={1} 
           castShadow 
           shadow-mapSize-width={1024} // Improve shadow quality
           shadow-mapSize-height={1024}
        />

        {/* No ScrollControls here anymore */}
        <Suspense fallback={null}>
           {/* <Environment preset="city" /> */}
           {/* Load local HDR file - Ensure this file exists in /public/environment/ */}
           <Environment files="/environment/default.hdr" /> 
           {/* Pass the pageScrollProgress prop down */}
           <DeviceModel pageScrollProgress={pageScrollProgress} />
        </Suspense>

        {/* Controls - Adjust target/limits based on model */}
        <OrbitControls 
           enableZoom={true} // Allow zoom 
           enablePan={true} // Allow panning for better inspection?
           target={[0, 0, 0]} // Adjust target based on model center
           minDistance={3} // Example min zoom
           maxDistance={10} // Example max zoom
           minPolarAngle={Math.PI / 4} // Limit vertical rotation up
           maxPolarAngle={Math.PI / 1.8} // Limit vertical rotation down
        />
      </Canvas>
    </div>
  );
} 