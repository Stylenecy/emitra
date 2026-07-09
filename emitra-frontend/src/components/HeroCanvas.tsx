import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ────────── CUSTOM SHADERS FOR GLOWING STARFIELD ──────────

const starVertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute vec3 aColor;
  attribute vec2 aTwinkle; // x: speed, y: offset
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    
    // Organic twinkling cycle (softened to be less distracting)
    vAlpha = 0.12 + 0.32 * sin(uTime * aTwinkle.x + aTwinkle.y);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Very slow cosmic drift
    mvPosition.x += sin(uTime * 0.04 + position.z) * 0.4;
    mvPosition.y += cos(uTime * 0.03 + position.x) * 0.4;
    
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation (stars look smaller when further away)
    gl_PointSize = aSize * (350.0 / -mvPosition.z);
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Generate circular shape with radial coordinates
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Discard outer edges
    if (dist > 0.5) discard;
    
    // Exponential falloff for soft glow effect
    float glow = exp(-dist * 5.0);
    
    // Edge smoothing
    float edgeAlpha = smoothstep(0.5, 0.1, dist);
    
    gl_FragColor = vec4(vColor, glow * edgeAlpha * vAlpha);
  }
`;

// ────────── STARFIELD COMPONENT ──────────

function StarField({ count = 1000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  const { positions, colors, sizes, twinkles } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkles = new Float32Array(count * 2);

    // Color themes: White/Blue, Emerald green, Amber/Gold
    const colorChoices = [
      new THREE.Color('#ffffff'), // pure white
      new THREE.Color('#9ae6b4'), // soft emerald
      new THREE.Color('#fbd38d'), // soft gold
      new THREE.Color('#a0aec0'), // slate cosmic dust
    ];

    for (let i = 0; i < count; i++) {
      // Position spread
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20; // push background

      // Color distribution (mostly white/slate, with accents of green and gold)
      const rand = Math.random();
      let selectedColor = colorChoices[0];
      if (rand > 0.85) {
        selectedColor = colorChoices[2]; // Amber gold accent
      } else if (rand > 0.65) {
        selectedColor = colorChoices[1]; // Emerald green accent
      } else if (rand > 0.5) {
        selectedColor = colorChoices[3]; // Cosmic slate dust
      }

      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;

      // Variable size (smaller to prevent screen clutter)
      sizes[i] = Math.random() * 1.3 + 0.4;

      // Twinkle speed and offset phase
      twinkles[i * 2] = Math.random() * 2.5 + 0.5; // speed
      twinkles[i * 2 + 1] = Math.random() * Math.PI * 2.0; // phase
    }

    return { positions, colors, sizes, twinkles };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.material) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aTwinkle"
          args={[twinkles, 2]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ────────── FLOATING GLASSMORPHISM CARD COMPONENT ──────────

interface FloatingCardProps {
  texturePath: string;
  position: [number, number, number];
  floatSpeed: number;
  floatIntensity: number;
  rotationSpeed: number;
  scale: number;
  phase: number;
  scrollY: React.MutableRefObject<number>;
  scrollFactor: number;
}

function FloatingCard({
  texturePath,
  position,
  floatSpeed,
  floatIntensity,
  rotationSpeed,
  scale,
  phase,
  scrollY,
  scrollFactor
}: FloatingCardProps) {
  const texture = useTexture(texturePath);
  const groupRef = useRef<THREE.Group>(null);
  
  // Custom slow continuous movement & wobble + scroll displacement
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Calculate scroll displacement
      const scrollOffset = scrollY.current * scrollFactor;

      // Float vertically + scroll offset displacement
      groupRef.current.position.y = position[1] + Math.sin(t * floatSpeed + phase) * floatIntensity - scrollOffset;
      
      // Subtle float horizontally
      groupRef.current.position.x = position[0] + Math.cos(t * floatSpeed * 0.4 + phase) * (floatIntensity * 0.25);
      
      // Subtle continuous rotations
      groupRef.current.rotation.x = Math.sin(t * 0.4 + phase) * 0.08;
      groupRef.current.rotation.y = t * rotationSpeed + phase;
      groupRef.current.rotation.z = Math.cos(t * 0.35 + phase) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]} scale={scale}>
      {/* Front-facing glowing border accent */}
      <RoundedBox args={[1.82, 1.82, 0.12]} radius={0.16} smoothness={4}>
        <meshPhysicalMaterial
          color="#0A8754"
          emissive="#0A8754"
          emissiveIntensity={0.15}
          roughness={0.1}
          transparent={true}
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Main glass card body */}
      <RoundedBox args={[1.8, 1.8, 0.1]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial
          transmission={0.8}
          roughness={0.12}
          thickness={0.7}
          ior={1.48}
          color="#ffffff"
          transparent={true}
          opacity={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Flat floating icon layer in front */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          opacity={0.92}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ────────── MAIN CONTENT CONTROLLER (PARALLAX & SCROLL) ──────────

interface SceneContentProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollY: React.MutableRefObject<number>;
}

function SceneContent({ mouse, scrollY }: SceneContentProps) {
  const containerRef = useRef<THREE.Group>(null);
  const { width, height } = useThree((state) => state.viewport);
  const isMobile = width < 7;

  // Position coordinates calculated dynamically based on viewport dimensions
  const cards = useMemo(() => {
    if (isMobile) {
      // Mobile setup: Push them backward, make them scroll together
      return [
        {
          path: '/assets/icon-ai.webp',
          pos: [-1.8, 2.2, -3.5] as [number, number, number],
          speed: 1.1,
          intensity: 0.15,
          rot: 0.03,
          scale: 0.55,
          phase: 0,
          factor: 0.015 // basic scroll factor for mobile
        },
        {
          path: '/assets/icon-carbon.webp',
          pos: [1.8, 1.8, -3.0] as [number, number, number],
          speed: 0.9,
          intensity: 0.12,
          rot: -0.04,
          scale: 0.50,
          phase: Math.PI * 0.5,
          factor: 0.013
        },
        {
          path: '/assets/icon-cert.webp',
          pos: [-1.6, -1.8, -3.2] as [number, number, number],
          speed: 1.3,
          intensity: 0.16,
          rot: 0.05,
          scale: 0.52,
          phase: Math.PI * 1.1,
          factor: 0.014
        },
        {
          path: '/assets/icon-growth.webp',
          pos: [1.6, -2.2, -3.4] as [number, number, number],
          speed: 0.85,
          intensity: 0.14,
          rot: -0.03,
          scale: 0.48,
          phase: Math.PI * 1.6,
          factor: 0.012
        }
      ];
    }

    // Desktop premium surrounding frame layout with rich multi-depth scroll parallax
    return [
      {
        path: '/assets/icon-ai.webp',
        pos: [-width * 0.32, height * 0.22, 0] as [number, number, number],
        speed: 1.1,
        intensity: 0.22,
        rot: 0.06,
        scale: 0.95,
        phase: 0,
        factor: 0.0087 // 1 / 115 unit-to-pixel ratio
      },
      {
        path: '/assets/icon-carbon.webp',
        pos: [-width * 0.36, -height * 0.20, -1.0] as [number, number, number],
        speed: 0.85,
        intensity: 0.18,
        rot: -0.05,
        scale: 0.90,
        phase: Math.PI * 0.5,
        factor: 0.0105 // 1 / 95 (scrolls faster, feels closer)
      },
      {
        path: '/assets/icon-cert.webp',
        pos: [width * 0.32, height * 0.18, -0.5] as [number, number, number],
        speed: 1.3,
        intensity: 0.25,
        rot: 0.08,
        scale: 0.92,
        phase: Math.PI * 1.1,
        factor: 0.0074 // 1 / 135 (scrolls slower, feels deeper)
      },
      {
        path: '/assets/icon-growth.webp',
        pos: [width * 0.35, -height * 0.22, -1.2] as [number, number, number],
        speed: 0.9,
        intensity: 0.20,
        rot: -0.06,
        scale: 0.85,
        phase: Math.PI * 1.6,
        factor: 0.0095 // 1 / 105
      }
    ];
  }, [width, height, isMobile]);

  useFrame(() => {
    if (containerRef.current) {
      // 1. Mouse cursor parallax targets
      const targetMouseX = mouse.current.x * 0.18; // smooth horizontal skew
      const targetMouseY = mouse.current.y * 0.12; // smooth vertical skew
      
      // 2. Scroll-based Y-axis rotation target (very slow/subtle to prevent dizziness)
      const targetScrollRotY = scrollY.current * 0.0003; 
      
      // 3. Smooth interpolation (lerp)
      containerRef.current.rotation.x += (targetMouseY - containerRef.current.rotation.x) * 0.06;
      containerRef.current.rotation.y += ((targetMouseX + targetScrollRotY) - containerRef.current.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={containerRef}>
      {/* Space Starfield (reduced count for cleaner visuals) */}
      <StarField count={isMobile ? 120 : 350} />
      
      {/* Floating Glassmorphic cards */}
      {cards.map((card, i) => (
        <FloatingCard
          key={i}
          texturePath={card.path}
          position={card.pos}
          floatSpeed={card.speed}
          floatIntensity={card.intensity}
          rotationSpeed={card.rot}
          scale={card.scale}
          phase={card.phase}
          scrollY={scrollY}
          scrollFactor={card.factor}
        />
      ))}
    </group>
  );
}

// ────────── MAIN HERO CANVAS ROOT COMPONENT ──────────

export default function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Track mouse coordinates normalized between -1 and 1
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -2; // Inverted Y for WebGL orientation
    };

    // Track scroll coordinates
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="neural-bg"
      style={{
        pointerEvents: 'none', // Allow cursor clicks on landing page text/buttons
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]} // Performance optimized DPR
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Cinematic multi-point color reflection light setup */}
        <ambientLight intensity={0.4} />
        
        {/* Emerald green backlight from left */}
        <pointLight position={[-15, 10, 3]} intensity={2.0} color="#0A8754" distance={30} decay={2} />
        
        {/* Amber gold sidelight from right */}
        <pointLight position={[15, -10, 3]} intensity={1.8} color="#F5A623" distance={30} decay={2} />
        
        {/* Pure white highlight flash from front/top */}
        <directionalLight position={[2, 8, 12]} intensity={1.2} color="#ffffff" />
        
        <SceneContent mouse={mouse} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
