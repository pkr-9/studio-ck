import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// === CONFIGURATION ===
const COUNT = 150; // Total objects
// Gold, Hot Pink, Electric Violet, Sky Blue, White
const COLORS = ["#FFD700", "#FF69B4", "#8A2BE2", "#00BFFF", "#FFFFFF"];

export function FallingIconsScene({ onSettle }: { onSettle: () => void }) {
  // Trigger the "glass reveal" after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(onSettle, 2500);
    return () => clearTimeout(timer);
  }, [onSettle]);

  return (
    <group>
      {/* Lighting essential for 3D visibility */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={2} color="#8b5cf6" />

      {/* Three layers of falling objects */}
      {/* Lowered the range [10, 30] so they appear on screen faster */}
      <FallingLayer geometryType="torus" count={50} range={[10, 30]} />
      <FallingLayer geometryType="box" count={50} range={[12, 32]} />
      <FallingLayer geometryType="icosahedron" count={50} range={[8, 28]} />

      <Environment preset="night" blur={0.6} />
    </group>
  );
}

// === REUSABLE COMPONENT ===
function FallingLayer({
  geometryType,
  count,
  range,
}: {
  geometryType: "torus" | "box" | "icosahedron";
  count: number;
  range: [number, number];
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 1. Setup Particle Data
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // X and Z spread (Width/Depth of the fall)
      const x = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 6;

      // Start Y (Height)
      const startY = Math.random() * (range[1] - range[0]) + range[0];

      // Pile Calculation:
      // Objects closer to center (0,0) land higher to form a mound
      const dist = Math.sqrt(x * x + z * z);
      const pileHeight = Math.max(-4, 2.5 - dist * 0.8);
      const targetY = pileHeight + Math.random() * 1.5; // Add noise

      return {
        pos: new THREE.Vector3(x, startY, z),
        velocity: 0,
        rotationSpeed: [
          Math.random() * 0.1,
          Math.random() * 0.1,
          Math.random() * 0.1,
        ],
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        scale: Math.random() * 0.4 + 0.3,
      };
    });
  }, [count, range]);

  // 2. Initialize Colors & Positions (Run once on mount)
  useEffect(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Set Color
      const color = new THREE.Color(particle.color);
      meshRef.current!.setColorAt(i, color);

      // Set Initial Matrix (so they don't flash at 0,0,0)
      dummy.position.copy(particle.pos);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [particles, dummy]);

  // 3. Animation Loop
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Cap delta to prevent huge jumps if tab is inactive
    const dt = Math.min(delta, 0.1);

    particles.forEach((particle, i) => {
      if (particle.pos.y > particle.targetY) {
        // Fall Logic
        particle.velocity += 15 * dt * 0.1; // Gravity
        particle.pos.y -= particle.velocity;

        // Rotate while falling
        particle.rotationSpeed[0] += dt;
        particle.rotationSpeed[1] += dt;
      } else {
        // Stop logic (Hit the pile)
        particle.pos.y = particle.targetY;
        particle.velocity = 0;
      }

      // Apply updates
      dummy.position.copy(particle.pos);
      dummy.rotation.set(
        particle.rotationSpeed[0],
        i, // varied rotation
        particle.rotationSpeed[1]
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Geometry selection */}
      {geometryType === "torus" && <torusGeometry args={[0.3, 0.1, 16, 32]} />}
      {geometryType === "box" && <boxGeometry args={[0.5, 0.5, 0.5]} />}
      {geometryType === "icosahedron" && (
        <icosahedronGeometry args={[0.4, 0]} />
      )}

      {/* Material */}
      <meshStandardMaterial roughness={0.2} metalness={0.7} />
    </instancedMesh>
  );
}
