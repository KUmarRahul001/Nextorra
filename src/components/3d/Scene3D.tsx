import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  className?: string;
}

const Scene3D: React.FC<Scene3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 0. Detect WebGL capability & reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene setup
    const scene = new THREE.Scene();
    
    // 2. Camera setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // 3. Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // Disable MSAA on mobile for 60fps power efficiency
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x6366f1, 2, 50);
    pointLight3.position.set(0, 15, -5);
    scene.add(pointLight3);

    // 5. Geometries
    const group = new THREE.Group();
    scene.add(group);

    // Mathematical Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(3.6, 0.7, isMobile ? 64 : 120, isMobile ? 12 : 20, 2, 3);
    const torusKnotMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    group.add(torusKnot);

    // Outer Geometric Wireframe Cage
    const icosaGeo = new THREE.IcosahedronGeometry(6.2, isMobile ? 1 : 2);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeSphere = new THREE.Mesh(icosaGeo, icosaMat);
    group.add(wireframeSphere);

    // Surrounding Orbital Microservice Nodes
    const nodeCount = isMobile ? 8 : 16;
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    });

    const nodeOffsets: { speed: number; radius: number; phase: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const radius = 6.8 + (Math.random() - 0.5) * 1.5;
      const phase = Math.random() * Math.PI * 2;
      const speed = (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1);
      
      nodeOffsets.push({ speed, radius, phase });
      nodesGroup.add(node);
    }
    group.add(nodesGroup);

    // Ambient Particle Cloud
    const particleCount = isMobile ? 60 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i + 2] = (Math.random() - 0.5) * 22;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse Parallax (only on desktop non-touch)
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = x * 0.4;
      targetRotationX = -y * 0.4;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      // Group rotation
      group.rotation.x = currentRotationX + elapsedTime * 0.08;
      group.rotation.y = currentRotationY + elapsedTime * 0.12;

      // Counter-rotate wireframe cage
      wireframeSphere.rotation.x = -elapsedTime * 0.05;
      wireframeSphere.rotation.y = -elapsedTime * 0.08;

      // Animate orbital nodes
      nodesGroup.children.forEach((child, i) => {
        const info = nodeOffsets[i];
        if (!info) return;
        const angle = elapsedTime * info.speed + info.phase;
        child.position.x = Math.cos(angle) * info.radius;
        child.position.y = Math.sin(angle * 1.5) * (info.radius * 0.6);
        child.position.z = Math.sin(angle) * info.radius;
      });

      // Rotate particle cloud
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Teardown and Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      icosaGeo.dispose();
      icosaMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative w-full h-full min-h-[380px] flex items-center justify-center bg-slate-900/40 rounded-xl ${className}`}>
        <div className="text-center p-6 text-slate-400">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-xl font-bold">
            &lt;/&gt;
          </div>
          <p className="text-sm font-semibold text-slate-300">Software Architecture</p>
          <p className="text-xs text-slate-500">Modular • Scalable • Cloud-Ready</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center ${className}`}
      aria-hidden="true"
    />
  );
};

export default Scene3D;
