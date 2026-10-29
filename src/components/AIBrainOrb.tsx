import { Line, OrbitControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { createRef, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";

type Edge = {
  fromIndex: number;
  toIndex: number | null;
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
  lineRef: React.RefObject<Line2 | null>;
};

export default function AIBrainOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const chipRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<Edge[]>([]);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [hoverChip, setHoverChip] = useState(false);

  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i += 1) {
      let v = new THREE.Vector3();
      do {
        v = new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(4),
          THREE.MathUtils.randFloatSpread(4),
          THREE.MathUtils.randFloatSpread(4)
        );
      } while (v.length() > 2);
      positions.push(v);
    }

    // Center all nodes around origin
    const center = positions.reduce(
      (acc, point) => acc.add(point),
      new THREE.Vector3()
    );
    center.divideScalar(positions.length);
    positions.forEach((point) => point.sub(center));
    return positions;
  }, []);

  const chipPoints = useMemo(
    () => [
      new THREE.Vector3(0.4, 0.4, 0.08),
      new THREE.Vector3(-0.4, 0.4, 0.08),
      new THREE.Vector3(0.4, -0.4, 0.08),
      new THREE.Vector3(-0.4, -0.4, 0.08),
      new THREE.Vector3(0, 0.5, 0.08),
      new THREE.Vector3(0.5, 0, 0.08),
    ],
    []
  );

  const edges = useMemo(() => {
    const nextEdges: Edge[] = [];
    const edgeSet = new Set<string>();

    nodes.forEach((node, i) => {
      const distances = nodes
        .map((target, j) => ({
          index: j,
          dist: node.distanceTo(target),
        }))
        .filter((item) => item.index !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      distances.forEach((item) => {
        const a = Math.min(i, item.index);
        const b = Math.max(i, item.index);
        const key = `${a}-${b}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          nextEdges.push({
            fromIndex: a,
            toIndex: b,
            from: nodes[a],
            to: nodes[b],
            speed: THREE.MathUtils.randFloat(0.5, 2),
            lineRef: createRef<Line2>(),
          });
        }
      });
    });

    // Connect some nodes directly into the chip surface
    const chipLinkedNodes = nodes.slice(0, chipPoints.length);
    chipLinkedNodes.forEach((node, index) => {
      nextEdges.push({
        fromIndex: nodes.indexOf(node),
        toIndex: null,
        from: node,
        to: chipPoints[index],
        speed: THREE.MathUtils.randFloat(0.8, 1.6),
        lineRef: createRef<Line2>(),
      });
    });

    edgesRef.current = nextEdges;
    return nextEdges;
  }, [chipPoints, nodes]);

  const adjacency = useMemo(() => {
    const map = new Map<number, Set<number>>();
    nodes.forEach((_, index) => map.set(index, new Set()));
    edges.forEach((edge) => {
      if (edge.toIndex === null) return;
      map.get(edge.fromIndex)?.add(edge.toIndex);
      map.get(edge.toIndex)?.add(edge.fromIndex);
    });
    return map;
  }, [edges, nodes]);

  useFrame((state, delta) => {
    // Rotate the brain group only — lights stay fixed
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }

    // Chip heartbeat pulse
    if (chipRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      chipRef.current.scale.setScalar(pulse);
    }

    // Animate edge dash and color
    edgesRef.current.forEach((edge, index) => {
      const line = edge.lineRef.current;
      if (!line) return;
      const material = line.material as unknown as {
        dashOffset?: number;
        color?: THREE.Color;
        opacity?: number;
        needsUpdate?: boolean;
      };
      if (typeof material.dashOffset === "number") {
        material.dashOffset -= delta / edge.speed;
      }

      if (!material.color || typeof material.opacity !== "number") return;

      // Full network activation on chip hover
      if (hoverChip) {
        material.color.lerpColors(
          new THREE.Color("#00aaff"),
          new THREE.Color("#ffffff"),
          1
        );
        material.opacity = THREE.MathUtils.lerp(material.opacity, 1, 0.1);
        material.needsUpdate = true;
        return;
      }

      const isActive = hoveredEdge === index;
      const isNeighbor =
        hoveredEdge !== null &&
        edge.toIndex !== null &&
        edgesRef.current[hoveredEdge]?.toIndex !== null &&
        (edgesRef.current[hoveredEdge]?.fromIndex === edge.fromIndex ||
          edgesRef.current[hoveredEdge]?.toIndex === edge.fromIndex ||
          edgesRef.current[hoveredEdge]?.fromIndex === edge.toIndex ||
          edgesRef.current[hoveredEdge]?.toIndex === edge.toIndex);

      const isNodeActive =
        hoveredNode !== null &&
        (edge.fromIndex === hoveredNode || edge.toIndex === hoveredNode);

      const nodeNeighbors =
        hoveredNode !== null
          ? Array.from(adjacency.get(hoveredNode) ?? [])
          : [];
      const isNodeNeighbor =
        hoveredNode !== null &&
        nodeNeighbors.some(
          (neighbor) =>
            edge.fromIndex === neighbor || edge.toIndex === neighbor
        );

      let targetIntensity = 0.3;
      if (isActive || isNodeActive) {
        targetIntensity = 1.5;
      } else if (isNeighbor || isNodeNeighbor) {
        targetIntensity = 0.8;
      }

      const normalized = THREE.MathUtils.clamp(
        (targetIntensity - 0.3) / 1.2,
        0,
        1
      );
      material.color.lerpColors(
        new THREE.Color("#00aaff"),
        new THREE.Color("#ffffff"),
        normalized
      );
      const targetOpacity = THREE.MathUtils.clamp(
        targetIntensity / 1.5,
        0,
        1
      );
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        targetOpacity,
        0.1
      );
      material.needsUpdate = true;
    });

    // Animate node glow
    nodeRefs.current.forEach((node, index) => {
      const material = node.material as THREE.MeshStandardMaterial;
      const isActive = hoveredNode === index;
      const isNeighbor =
        hoveredNode !== null && adjacency.get(hoveredNode)?.has(index);
      const target = isActive ? 1.5 : isNeighbor ? 0.8 : 0.3;
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        target,
        0.1
      );
      material.emissive.lerpColors(
        new THREE.Color("#00aaff"),
        new THREE.Color("#ffffff"),
        (material.emissiveIntensity - 0.3) / 1.2
      );
    });
  });

  const pinPositions = useMemo(
    () => [
      new THREE.Vector3(-0.65, -0.3, 0),
      new THREE.Vector3(-0.65, 0.3, 0),
      new THREE.Vector3(0.65, -0.3, 0),
      new THREE.Vector3(0.65, 0.3, 0),
      new THREE.Vector3(-0.3, -0.65, 0),
      new THREE.Vector3(0.3, -0.65, 0),
      new THREE.Vector3(-0.3, 0.65, 0),
      new THREE.Vector3(0.3, 0.65, 0),
    ],
    []
  );

  const traceLines = useMemo(
    () => [
      { position: [0, 0.3, 0.08], size: [0.8, 0.03, 0.01] },
      { position: [0.2, 0, 0.08], size: [0.4, 0.03, 0.01] },
      { position: [-0.2, -0.25, 0.08], size: [0.4, 0.03, 0.01] },
      { position: [0, -0.4, 0.08], size: [0.6, 0.03, 0.01] },
      { position: [0.35, 0.15, 0.08], size: [0.25, 0.03, 0.01] },
    ],
    []
  );

  return (
    <>
      {/* ✅ FIXED: Lights and background are now OUTSIDE the rotating group.
          Previously they were inside groupRef, meaning they rotated with
          the brain — causing lighting to shift as the scene spun. */}
      <color attach="background" args={["#001133"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={1.2} />
      <pointLight position={[-6, -4, -6]} intensity={0.4} color="#0044ff" />

      {/* OrbitControls also outside the rotating group */}
      <OrbitControls
        enablePan={false}
        target={[0, 0, 0]}
        minDistance={3}
        maxDistance={10}
      />

      {/* Rotating brain group */}
      <group ref={groupRef}>
        {/* Central AI chip */}
        <group
          ref={chipRef}
          position={[0, 0, 0]}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHoverChip(true);
          }}
          onPointerOut={() => setHoverChip(false)}
        >
          {/* Chip body */}
          <mesh>
            <boxGeometry args={[1, 1, 0.15]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={1}
              roughness={0.2}
            />
          </mesh>

          {/* Pins */}
          {pinPositions.map((pos, index) => (
            <mesh key={index} position={pos.toArray() as [number, number, number]}>
              <boxGeometry args={[0.08, 0.2, 0.05]} />
              <meshStandardMaterial
                color="#333333"
                metalness={1}
                roughness={0.2}
              />
            </mesh>
          ))}

          {/* Golden circuit traces */}
          {traceLines.map((trace, index) => (
            <mesh
              key={index}
              position={trace.position as [number, number, number]}
            >
              <boxGeometry args={trace.size as [number, number, number]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={hoverChip ? 2 : 0.8}
              />
            </mesh>
          ))}

          {/* AI text label */}
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.35}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
          >
            AI
            <meshStandardMaterial
              emissive="#00ffff"
              emissiveIntensity={hoverChip ? 3 : 1}
              color="#00ffff"
            />
          </Text>
        </group>

        {/* Neural edges */}
        {edges.map((edge, index) => (
          <Line
            key={`${edge.fromIndex}-${edge.toIndex}-${index}`}
            points={[edge.from, edge.to]}
            color="#00aaff"
            lineWidth={1}
            dashed
            dashSize={0.2}
            gapSize={0.3}
            transparent
            opacity={0.3}
            ref={edge.lineRef}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHoveredEdge(index);
            }}
            onPointerOut={() => setHoveredEdge(null)}
          />
        ))}

        {/* Neural nodes */}
        {nodes.map((node, index) => (
          <mesh
            key={index}
            position={node}
            ref={(mesh) => {
              if (mesh) nodeRefs.current[index] = mesh;
            }}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHoveredNode(index);
            }}
            onPointerOut={() => setHoveredNode(null)}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#00aaff"
              emissive="#00aaff"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
