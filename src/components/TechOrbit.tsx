import { Billboard, Text } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { SVGLoader, type SVGResult } from "three/examples/jsm/loaders/SVGLoader.js";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type OrbitTech = {
  name: string;
  icon: string;
  color: string;
  angle: number;
  speed: number;
  faceText?: string;
};

type LogoPart = {
  geometry: THREE.BufferGeometry;
  edgeGeometry?: THREE.BufferGeometry;
  color: THREE.Color;
};

const techStack: OrbitTech[] = [
  { name: "React", icon: "/icons/react.svg?v=3", color: "#61dafb", angle: 0, speed: 0.18 },
  { name: "TypeScript", icon: "/icons/typescript.svg?v=3", color: "#3178c6", angle: 0.63, speed: 0.18, faceText: "TS" },
  { name: "JavaScript", icon: "/icons/js.svg?v=3", color: "#f7df1e", angle: 1.26, speed: 0.18, faceText: "JS" },
  { name: "Svelte", icon: "/icons/svelte.svg?v=3", color: "#ff3e00", angle: 1.89, speed: 0.18 },
  { name: "CSS", icon: "/icons/css.svg?v=3", color: "#264de4", angle: 2.52, speed: 0.18, faceText: "CSS" },
  { name: "HTML", icon: "/icons/html.svg?v=3", color: "#e34f26", angle: 3.15, speed: 0.18, faceText: "HTML" },
  { name: "Node.js", icon: "/icons/node.svg?v=3", color: "#339933", angle: 3.78, speed: 0.18 },
  { name: "PostgreSQL", icon: "/icons/postgres.svg?v=3", color: "#336791", angle: 4.41, speed: 0.18 },
  { name: "Supabase", icon: "/icons/supabase.svg?v=3", color: "#3ecf8e", angle: 5.04, speed: 0.18 },
  { name: "Firebase", icon: "/icons/firebase.svg?v=3", color: "#ffca28", angle: 5.67, speed: 0.18 },
];

function createLogoParts(svg: SVGResult): LogoPart[] {
  const parts: LogoPart[] = [];
  const shapesToExtrude: Array<{ shape: THREE.Shape; pathIndex: number; color: THREE.Color }> = [];
  const sourceBounds = new THREE.Box2();

  for (const [pathIndex, path] of svg.paths.entries()) {
    const style = path.userData?.style ?? {};
    const fill = style.fill;

    if (fill && fill !== "none" && fill !== "transparent") {
      for (const shape of SVGLoader.createShapes(path)) {
        shape.getPoints(24).forEach((point) => sourceBounds.expandByPoint(point));
        shapesToExtrude.push({ shape, pathIndex, color: new THREE.Color(fill) });
      }
    }

  }

  // Derive thickness and bevel from each SVG's own coordinate scale. This
  // prevents compact 24px marks (like PostgreSQL) becoming oversized slabs.
  const sourceSize = sourceBounds.getSize(new THREE.Vector2());
  const sourceUnit = Math.max(Math.min(sourceSize.x, sourceSize.y), 1);
  for (const { shape, pathIndex, color } of shapesToExtrude) {
    const bevel = sourceUnit * 0.032;
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: sourceUnit * 0.18,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
    });
    // Keep layered SVG fills from z-fighting when their paths overlap.
    geometry.translate(0, 0, pathIndex * sourceUnit * 0.006);
    parts.push({ geometry, color });
  }

  // SVG paths use a top-left origin and differ in viewBox size. Normalize each
  // complete mark to the same physical footprint before extruding it in 3D.
  const bounds = new THREE.Box3();
  for (const part of parts) {
    part.geometry.computeBoundingBox();
    if (part.geometry.boundingBox) bounds.union(part.geometry.boundingBox);
  }

  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  bounds.getCenter(center);
  bounds.getSize(size);
  const scale = 0.88 / Math.max(size.x, size.y, 1);

  for (const part of parts) {
    part.geometry.translate(-center.x, -center.y, -center.z);
    part.geometry.scale(scale, -scale, scale);
    part.edgeGeometry = new THREE.EdgesGeometry(part.geometry, 18);
  }

  return parts;
}

function ExtrudedLogo({ svg, faceText, sideColor }: { svg: SVGResult; faceText?: string; sideColor: string }) {
  const parts = useMemo(() => createLogoParts(svg), [svg]);

  useEffect(() => () => parts.forEach(({ geometry, edgeGeometry }) => {
    geometry.dispose();
    edgeGeometry?.dispose();
  }), [parts]);

  return (
    <group>
      {parts.map(({ geometry, edgeGeometry, color: partColor }, index) => (
        <group key={index}>
          <mesh geometry={geometry} castShadow receiveShadow>
            <meshBasicMaterial
              attach="material-0"
              color={partColor}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
            <meshPhysicalMaterial
              attach="material-1"
              color={new THREE.Color(sideColor).multiplyScalar(0.68)}
              emissive={new THREE.Color(sideColor).multiplyScalar(0.68)}
              emissiveIntensity={0.14}
              metalness={0.12}
              roughness={0.28}
              clearcoat={0.82}
              clearcoatRoughness={0.14}
              side={THREE.DoubleSide}
            />
          </mesh>
          {edgeGeometry && (
            <lineSegments geometry={edgeGeometry} renderOrder={2}>
              <lineBasicMaterial
                color={partColor.clone().lerp(new THREE.Color("#ffffff"), 0.12)}
                transparent
                opacity={0.9}
                toneMapped={false}
              />
            </lineSegments>
          )}
        </group>
      ))}
      {faceText && (
        <Text
          position={[0, -0.015, 0.18]}
          fontSize={faceText === "HTML" ? 0.15 : faceText === "CSS" ? 0.16 : faceText === "TS" ? 0.3 : 0.21}
          color={faceText === "JS" ? "#242424" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.003}
          outlineColor={faceText === "JS" ? "#242424" : "#172033"}
        >
          {faceText}
        </Text>
      )}
    </group>
  );
}

function ReactLogo() {
  const rings = useMemo(() => {
    const rotations = [0, Math.PI / 3, -Math.PI / 3];
    return rotations.map((rotation) => {
      const points = Array.from({ length: 128 }, (_, index) => {
        const angle = (index / 128) * Math.PI * 2;
        const x = Math.cos(angle) * 0.46;
        const y = Math.sin(angle) * 0.2;
        return new THREE.Vector3(
          x * Math.cos(rotation) - y * Math.sin(rotation),
          x * Math.sin(rotation) + y * Math.cos(rotation),
          0,
        );
      });
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 160, 0.06, 20, true);
    });
  }, []);

  useEffect(() => () => rings.forEach((geometry) => geometry.dispose()), [rings]);

  return (
    <group>
      {rings.map((geometry, index) => (
        <mesh key={index} geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#61dafb"
            metalness={0.12}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.12}
            emissive="#159ac0"
            emissiveIntensity={0.28}
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.085, 32, 32]} />
        <meshPhysicalMaterial
          color="#61dafb"
          metalness={0.1}
          roughness={0.16}
          clearcoat={1}
          emissive="#159ac0"
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export default function TechOrbit() {
  const iconRefs = useRef<Array<THREE.Group | null>>([]);
  const logoRefs = useRef<Array<THREE.Group | null>>([]);
  const tech = useMemo(() => techStack, []);
  const icons = useLoader(SVGLoader, tech.map((item) => item.icon));
  const canvasWidth = useThree((state) => state.size.width);
  const orbitScale = Math.max(0.78, Math.min(1, canvasWidth / 380));

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    tech.forEach((item, index) => {
      const icon = iconRefs.current[index];
      if (!icon) return;

      const angle = item.angle + time * item.speed;
      icon.position.set(
        Math.cos(angle) * 2.55 * orbitScale,
        Math.sin(angle) * 1.62 * orbitScale + 0.14 * orbitScale,
        Math.cos(angle) * 0.42 * orbitScale,
      );
      icon.rotation.z = Math.sin(time * 0.7 + item.angle) * 0.08;
      const logo = logoRefs.current[index];
      if (logo) {
        logo.rotation.y = Math.sin(time * 0.8 + item.angle) * 0.42;
        logo.rotation.x = Math.cos(time * 0.65 + item.angle) * 0.14;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 5, 6]} intensity={3.2} />
      <pointLight position={[-4, 2, 2]} color="#7c5cff" intensity={24} distance={10} />
      <pointLight position={[4, -1, -2]} color="#38bdf8" intensity={20} distance={9} />

      {tech.map((item, index) => (
        <group
          key={item.name}
          ref={(node) => {
            iconRefs.current[index] = node;
          }}
        >
          <Billboard follow lockY={false}>
            <group
              ref={(node) => {
                logoRefs.current[index] = node;
              }}
                scale={item.name === "React" ? 1.25 : item.name === "PostgreSQL" ? 1.28 : 1}
            >
              {item.name === "React" ? (
                <ReactLogo />
              ) : (
                <ExtrudedLogo svg={icons[index]} faceText={item.faceText} sideColor={item.color} />
              )}
            </group>
            <group position={[0, -0.74, 0]}>
              <Text
                position={[0, 0, -0.018]}
                fontSize={0.16}
                fontWeight={700}
                color="#07111f"
                anchorX="center"
                anchorY="middle"
              >
                {item.name}
              </Text>
              <Text
                position={[0, 0, 0.012]}
                fontSize={0.16}
                fontWeight={700}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.012}
                outlineColor="#07111f"
              >
                {item.name}
              </Text>
            </group>
          </Billboard>
        </group>
      ))}
    </>
  );
}
