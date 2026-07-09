import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NeuralBackground — slow-drifting abstract neural network / particle field.
 * Pure Three.js, no external assets. Fixed full-screen, behind content.
 */
export default function NeuralBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      1,
      2000
    );
    camera.position.z = 420;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ── Nodes ──
    const COUNT = 130;
    const BOUND = 360;
    const nodes: { p: THREE.Vector3; v: THREE.Vector3 }[] = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        p: new THREE.Vector3(
          (Math.random() - 0.5) * BOUND * 1.6,
          (Math.random() - 0.5) * BOUND,
          (Math.random() - 0.5) * BOUND
        ),
        v: new THREE.Vector3(
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.25
        ),
      });
    }

    const positions = new Float32Array(COUNT * 3);
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: new THREE.Color('#0A8754'),
      size: 4.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // A few accent amber nodes
    const accentIdx: number[] = [];
    for (let i = 0; i < 10; i++) accentIdx.push(Math.floor(Math.random() * COUNT));

    // ── Connection lines ──
    const MAX_DIST = 110;
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(COUNT * COUNT * 3);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#1A2E4A'),
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const group = new THREE.Group();
    scene.add(group);
    group.add(points);
    group.add(lines);

    // ── Pointer parallax ──
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => (visible = e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(mount);

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();

      // move nodes
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i];
        n.p.addScaledVector(n.v, reduced ? 0.15 : 1);
        // wrap
        (['x', 'y', 'z'] as const).forEach((ax) => {
          const lim = ax === 'y' ? BOUND : BOUND * 1.6;
          if (n.p[ax] > lim) n.v[ax] *= -1, (n.p[ax] = lim);
          if (n.p[ax] < -lim) n.v[ax] *= -1, (n.p[ax] = -lim);
        });
        positions[i * 3] = n.p.x;
        positions[i * 3 + 1] = n.p.y;
        positions[i * 3 + 2] = n.p.z;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      // connections
      let li = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const a = nodes[i].p;
          const b = nodes[j].p;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < MAX_DIST) {
            linePos[li++] = a.x; linePos[li++] = a.y; linePos[li++] = a.z;
            linePos[li++] = b.x; linePos[li++] = b.y; linePos[li++] = b.z;
          }
        }
      }
      lineGeo.setDrawRange(0, li / 3);
      lineGeo.attributes.position.needsUpdate = true;

      // slow group rotation + pointer parallax
      group.rotation.y += reduced ? 0.0004 : 0.0012;
      group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.03;
      group.rotation.z += (pointer.x * 0.1 - group.rotation.z) * 0.03;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      renderer.dispose();
      pointsGeo.dispose();
      lineGeo.dispose();
      pointsMat.dispose();
      lineMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="neural-bg" aria-hidden="true" />;
}
