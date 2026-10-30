import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const EARTH_TEXTURE = "/textures/earth/blue-marble.jpg";
const CLOUD_TEXTURE = "/textures/earth/clouds-alpha.png";

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function Atmosphere() {
  return (
    <mesh scale={1.008}>
      <sphereGeometry args={[2.55, 48, 48]} />
      <shaderMaterial
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewPosition = -viewPosition.xyz;
            gl_Position = projectionMatrix * viewPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0), 5.2);
            gl_FragColor = vec4(0.16, 0.52, 1.0, rim * 0.34);
          }
        `}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function StarField({ reducedMotion }: { reducedMotion: boolean }) {
  const geometry = useMemo(() => {
    const count = 760;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const brightness = new Float32Array(count);
    let seed = 841;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positions[offset] = (random() - 0.5) * 44;
      positions[offset + 1] = (random() - 0.5) * 28;
      positions[offset + 2] = -8 - random() * 24;
      sizes[index] = 0.2 + random() * 0.62;
      phases[index] = random() * Math.PI * 2;
      brightness[index] = 0.45 + random() * 0.5;
    }

    const stars = new THREE.BufferGeometry();
    stars.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    stars.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    stars.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    stars.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
    return stars;
  }, []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      attribute float aBrightness;
      uniform float uTime;
      varying float vBrightness;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        float twinkle = 0.82 + 0.18 * sin(uTime * 0.65 + aPhase);
        gl_PointSize = aSize * twinkle * (105.0 / max(-viewPosition.z, 1.0));
        vBrightness = aBrightness * twinkle;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      varying float vBrightness;
      void main() {
        float radius = length(gl_PointCoord - vec2(0.5));
        float softDot = 1.0 - smoothstep(0.25, 0.5, radius);
        gl_FragColor = vec4(0.82, 0.9, 1.0, softDot * min(vBrightness * 1.15, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    material.uniforms.uTime.value = reducedMotion ? 0 : state.clock.elapsedTime;
  });

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  return (
    <points geometry={geometry}>
      <primitive object={material} attach="material" />
    </points>
  );
}

function Earth({ reducedMotion }: { reducedMotion: boolean }) {
  const earthGroup = useRef<THREE.Group>(null);
  const cloudGroup = useRef<THREE.Group>(null);
  const [surface, clouds] = useLoader(THREE.TextureLoader, [EARTH_TEXTURE, CLOUD_TEXTURE]);
  const { width, height } = useThree((state) => state.viewport);

  useEffect(() => {
    surface.colorSpace = THREE.SRGBColorSpace;
    clouds.colorSpace = THREE.SRGBColorSpace;
    surface.anisotropy = 4;
    clouds.anisotropy = 2;
    surface.needsUpdate = true;
    clouds.needsUpdate = true;
  }, [surface, clouds]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (earthGroup.current) earthGroup.current.rotation.y += delta * 0.035;
    if (cloudGroup.current) cloudGroup.current.rotation.y += delta * 0.043;
  });

  const diameter = 2 * 2.55;
  const scale = Math.min(1.35, (height * 0.84) / diameter, (width * 0.88) / diameter);
  const position: [number, number, number] = [
    0,
    height * 0.04,
    0,
  ];

  return (
    <group position={position} scale={scale}>
      <directionalLight position={[4, 2.5, 7]} intensity={2.7} color="#eaf5ff" />
      <ambientLight intensity={0.1} color="#7daeff" />
      <group ref={earthGroup} rotation={[0.08, -0.72, -0.04]}>
        <mesh>
          <sphereGeometry args={[2.55, 64, 64]} />
          <meshStandardMaterial map={surface} roughness={0.92} metalness={0.01} />
        </mesh>
      </group>
      <group ref={cloudGroup} rotation={[0.08, -0.72, -0.04]}>
        <mesh>
          <sphereGeometry args={[2.585, 48, 48]} />
          <meshBasicMaterial
            map={clouds}
            transparent
            opacity={0.48}
            depthWrite={false}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
      <Atmosphere />
    </group>
  );
}

function LoadingEarth() {
  const { width, height } = useThree((state) => state.viewport);
  const diameter = 2 * 2.55;
  const scale = Math.min(1.35, (height * 0.84) / diameter, (width * 0.88) / diameter);
  const position: [number, number, number] = [
    0,
    height * 0.04,
    0,
  ];

  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshStandardMaterial color="#0b3760" roughness={0.9} />
      </mesh>
      <Atmosphere />
    </group>
  );
}

function StaticEarthFallback() {
  return <div className="earth-static-fallback" aria-hidden="true" />;
}

export default function EarthBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="earth-backdrop" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 42, near: 0.1, far: 80 }}
        dpr={[1, 1.35]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={<StaticEarthFallback />}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <StarField reducedMotion={reducedMotion} />
        <Suspense fallback={<LoadingEarth />}>
          <Earth reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
