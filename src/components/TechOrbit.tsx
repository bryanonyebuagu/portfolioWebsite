import { Billboard, OrbitControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type IconOrbit = {
  label: string;
  color: string;
  radius: number;
  speed: number;
  angle: number;
};

export default function TechOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const icons = useMemo<IconOrbit[]>(
    () => [
      {
        label: "React",
        color: "#61DAFB",
        radius: 3.2,
        speed: 0.3,
        angle: 0,
      },
      {
        label: "CSS3",
        color: "#1572B6",
        radius: 2.6,
        speed: 0.5,
        angle: 1.4,
      },
      {
        label: "JavaScript",
        color: "#F7DF1E",
        radius: 2.1,
        speed: 0.9,
        angle: 2.2,
      },
      {
        label: "HTML5",
        color: "#E34F26",
        radius: 1.8,
        speed: 0.7,
        angle: 3.6,
      },
      {
        label: "PostgreSQL",
        color: "#336791",
        radius: 2.9,
        speed: 0.4,
        angle: 4.8,
      },
    ],
    []
  );

  const iconRefs = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    icons.forEach((icon, index) => {
      if (hovered === index) return;
      icon.angle += delta * icon.speed;
      const mesh = iconRefs.current[index];
      if (!mesh) return;
      mesh.position.x = Math.cos(icon.angle) * icon.radius;
      mesh.position.z = Math.sin(icon.angle) * icon.radius * 0.7;
      mesh.position.y = Math.sin(icon.angle * 0.7) * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.4, 0.2, 1.6]} />
        <meshStandardMaterial
          color="#a8b3c7"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.7, -0.6]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.1]} />
        <meshStandardMaterial
          color="#cbd5f5"
          metalness={0.4}
          roughness={0.25}
          emissive="#1e293b"
          emissiveIntensity={0.4}
        />
      </mesh>

      {icons.map((icon, index) => (
        <Billboard key={icon.label} follow lockY={false}>
          <mesh
            ref={(mesh) => {
              if (mesh) iconRefs.current[index] = mesh;
            }}
            position={[Math.cos(icon.angle) * icon.radius, 0, Math.sin(icon.angle) * icon.radius]}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHovered(index);
            }}
            onPointerOut={() => setHovered(null)}
            scale={hovered === index ? 1.4 : 1}
          >
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial
              color={icon.color}
              emissive={icon.color}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.1}
            />
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {icon.label}
            </Text>
          </mesh>
        </Billboard>
      ))}
      <OrbitControls enablePan={false} target={[0, 0, 0]} />
    </group>
  );
}
