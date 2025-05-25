'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { cn } from '~/lib/utils';

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

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  className,
  containerClassName,
  colors = [255 / 255, 100 / 255, 100 / 255], // Default: Soft Reddish-Pink
  waveConfig = { speed: 0.0005, amplitude: 0.05, frequency: 2.5 },
  blur = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const uniformsRef = useRef<any>(null); // Using any for simplicity here

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uAmplitude;
    uniform float uFrequency;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * uFrequency + uTime) * uAmplitude;
      pos.z += cos(pos.y * uFrequency * 0.8 + uTime * 0.8) * uAmplitude * 0.7;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uTime;

    void main() {
      float edgeFade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y); // Fade top/bottom
      float alpha = edgeFade * 0.2; // Base alpha, adjust for intensity
      
      // Subtle time-based variation in alpha
      alpha += sin(vUv.x * 5.0 + uTime * 0.5) * 0.02;
      alpha = clamp(alpha, 0.0, 0.3); // Clamp max alpha

      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  useEffect(() => {
    if (!canvasRef.current) return;

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
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime() * (waveConfig.speed || 0.0005) * 100; // Adjust speed multiplier
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (meshRef.current) scene.remove(meshRef.current);
      geometry.dispose();
      material.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      meshRef.current = null;
      uniformsRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run effect only once on mount

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