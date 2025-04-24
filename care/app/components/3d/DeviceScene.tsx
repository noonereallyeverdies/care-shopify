import React, { useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Load the GLTF model
function DeviceModel({ pageScrollProgress }: { pageScrollProgress: number }) {
  // Path relative to the /public directory
  const modelPath = '/justtheproduct.glb'; 
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const redLightsRef = useRef<THREE.Group>(null); 

  // Initial rotation
  const initialRotationY = Math.PI / 10;
  const initialRotationX = Math.PI / 12;

  // Page Scroll Animation
  useFrame(() => {
    if (!groupRef.current) return;

    // Simple rotation animation
    groupRef.current.rotation.y += 0.003;
  });
  
  // Clone the scene to avoid modifying the original cache
  const clonedScene = scene.clone();

  useEffect(() => {
    // Set shadows for all meshes in the loaded model
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  return (
    <group ref={groupRef} rotation-y={initialRotationY} rotation-x={initialRotationX} dispose={null}>
      <primitive object={clonedScene} />
      <group ref={redLightsRef}>
        <pointLight position={[0, 0.5, 1]} color={0xff0000} intensity={1} distance={3} />
        <pointLight position={[0, -0.5, 1]} color={0xff0000} intensity={1} distance={3} />
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('/justtheproduct.glb');

// Main Scene Component
export function DeviceScene() {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 0 }}>
      <Canvas shadows camera={{ position: [0, 1, 6], fov: 50 }}>
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.4} /> 
        <directionalLight 
          position={[8, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <DeviceModel pageScrollProgress={0} />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          target={[0, 0, 0]}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
} 