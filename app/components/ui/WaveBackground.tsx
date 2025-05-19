'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { cn } from '~/lib/utils';

// Types only - THREE will be dynamically imported
import type * as THREE from 'three';

interface WaveBackgroundProps {
  className?: string;
  containerClassName?: string;
  colors?: [number, number, number]; // RGB for the wave color
  waveConfig?: {
    speed?: number;
    amplitude?: number;
    frequency?: number;
  };
  blur?: number;
}

// Vertex and fragment shaders
const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    
    // Wave calculation
    vec3 pos = position;
    float waveX = sin(pos.x * uFrequency + uTime) * uAmplitude;
    float waveY = cos(pos.y * uFrequency + uTime) * uAmplitude;
    
    pos.z = waveX + waveY;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;
  
  void main() {
    // Simple gradient based on position
    float alpha = 0.4 * (1.0 - distance(vUv, vec2(0.5)));
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  className = '',
  containerClassName = '',
  colors = [0.53, 0.00, 0.39], // Default purple/red color
  waveConfig = {
    speed: 0.0003, // Animation speed
    amplitude: 0.15, // Wave height
    frequency: 8.0, // Wave frequency/density
  },
  blur = 5, // Blur effect intensity
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const uniformsRef = useRef<any>(null);
  const threeRef = useRef<typeof THREE | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Dynamically import Three.js only when the component mounts
    let isMounted = true; // For avoiding state updates on unmounted component
    
    const setupThree = async () => {
      try {
        // Dynamic import of Three.js
        const THREE = await import('three');
        if (!isMounted || !canvasRef.current) return;
        
        // Store Three.js reference
        threeRef.current = THREE;
        
        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera (Orthographic for flat background)
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 2; // Adjust based on plane size and desired view
        const camera = new THREE.OrthographicCamera(
          frustumSize * aspect / -2,
          frustumSize * aspect / 2,
          frustumSize / 2,
          frustumSize / -2,
          0.1,
          100
        );
        camera.position.z = 1;
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true, // Transparent background
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        // Geometry (Plane with enough segments for deformation)
        const geometry = new THREE.PlaneGeometry(3, 3, 50, 50);

        // Material (ShaderMaterial for custom vertex/fragment logic)
        const uniforms = {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(colors[0], colors[1], colors[2]) },
          uAmplitude: { value: waveConfig.amplitude },
          uFrequency: { value: waveConfig.frequency },
        };
        uniformsRef.current = uniforms;

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          transparent: true,
          side: THREE.DoubleSide,
        });

        // Mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI * 0.1; // Slight tilt for perspective
        scene.add(mesh);
        meshRef.current = mesh;

        // Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
          if (!isMounted) return;
          
          uniforms.uTime.value = clock.getElapsedTime() * (waveConfig.speed || 0.0005) * 100;
          renderer.render(scene, camera);
          animationIdRef.current = requestAnimationFrame(animate);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
          if (!isMounted || !camera || !renderer) return;
          
          const width = window.innerWidth;
          const height = window.innerHeight;
          camera.left = frustumSize * width / height / -2;
          camera.right = frustumSize * width / height / 2;
          camera.top = frustumSize / 2;
          camera.bottom = frustumSize / -2;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        // Return cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
          
          // Clean up resources
          if (meshRef.current && sceneRef.current) {
            sceneRef.current.remove(meshRef.current);
          }
          if (geometry) geometry.dispose();
          if (material) material.dispose();
          if (rendererRef.current) rendererRef.current.dispose();
        };
      } catch (error) {
        console.error('Error loading Three.js:', error);
      }
    };
    
    setupThree();
    
    // Cleanup
    return () => {
      isMounted = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [colors, waveConfig.amplitude, waveConfig.frequency, waveConfig.speed]);

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 w-full h-full", className)}
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  );
}; 