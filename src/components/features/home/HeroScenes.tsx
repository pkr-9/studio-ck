// // 1 ----------------------------------------------------
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
// import * as THREE from "three";

// // Reusing the Lens for Side Layouts
// export function FloatingLens({
//   position,
// }: {
//   position: [number, number, number];
// }) {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (!meshRef.current) return;
//     const { x, y } = state.mouse;
//     meshRef.current.rotation.x = THREE.MathUtils.lerp(
//       meshRef.current.rotation.x,
//       y * 0.2,
//       0.1
//     );
//     meshRef.current.rotation.y = THREE.MathUtils.lerp(
//       meshRef.current.rotation.y,
//       x * 0.2,
//       0.1
//     );
//   });

//   return (
//     <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
//       <mesh ref={meshRef} position={position}>
//         <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
//         <MeshTransmissionMaterial
//           backside
//           backsideThickness={5}
//           thickness={2}
//           chromaticAberration={0.05}
//           anisotropy={0.5}
//           color="#6d5ce8"
//           resolution={512}
//         />
//       </mesh>
//     </Float>
//   );
// }

// // === THE STEREO FRAMES (Center Layout Design) ===
// export function StereoPillars() {
//   const groupRef = useRef<THREE.Group>(null);

//   // Gentle rotation of the entire stage
//   useFrame((state) => {
//     if (!groupRef.current) return;
//     const { x } = state.mouse;
//     // Rotate the group slightly based on mouse X to create parallax
//     groupRef.current.rotation.y = THREE.MathUtils.lerp(
//       groupRef.current.rotation.y,
//       x * 0.05,
//       0.05
//     );
//   });

//   const Pillar = ({
//     position,
//     color,
//     rotation,
//   }: {
//     position: [number, number, number];
//     color: string;
//     rotation: [number, number, number];
//   }) => (
//     <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
//       <group position={position} rotation={rotation}>
//         {/* The Glass Frame */}
//         <mesh>
//           <boxGeometry args={[1.5, 7, 0.2]} />
//           <MeshTransmissionMaterial
//             thickness={1.5}
//             chromaticAberration={0.1}
//             anisotropy={0.2}
//             color={color}
//             resolution={256} // Lower resolution for better performance with two objects
//             distortion={0.2}
//             distortionScale={0.3}
//             roughness={0.2}
//           />
//         </mesh>

//         {/* Wireframe internal structure (Abstract "Film Strip") */}
//         <mesh position={[0, 0, 0]}>
//           <boxGeometry args={[1.2, 6.8, 0.1]} />
//           <meshBasicMaterial
//             wireframe
//             color="white"
//             transparent
//             opacity={0.1}
//           />
//         </mesh>
//       </group>
//     </Float>
//   );

//   return (
//     <group ref={groupRef}>
//       {/* Background Atmosphere */}
//       <Sparkles
//         count={50}
//         scale={12}
//         size={4}
//         speed={0.4}
//         opacity={0.5}
//         color="#6d5ce8"
//       />

//       {/* LEFT PILLAR (Electric Violet) */}
//       <Pillar position={[-6, 0, -1]} rotation={[0, 0.3, 0.1]} color="#8b5cf6" />

//       {/* RIGHT PILLAR (Cyan/Indigo) */}
//       <Pillar
//         position={[6, 0, -1]}
//         rotation={[0, -0.3, -0.1]}
//         color="#3b82f6"
//       />
//     </group>
//   );
// }

// // 2 ----------------------------------------------------
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import {
//   Float,
//   MeshDistortMaterial,
//   Sphere,
//   Sparkles,
// } from "@react-three/drei";
// import * as THREE from "three";

// // === SCENE 1: THE LIQUID LENS (For Side Layouts) ===
// // A morphing, reflective blob representing organic flow and nature
// export function LiquidLens({
//   position,
// }: {
//   position: [number, number, number];
// }) {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (!meshRef.current) return;
//     // Slowly rotate the distortion field
//     meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
//     meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
//   });

//   return (
//     <group position={position}>
//       <Float speed={2} rotationIntensity={1} floatIntensity={1}>
//         {/* Main Liquid Blob */}
//         <Sphere args={[1.4, 128, 128]} ref={meshRef}>
//           <MeshDistortMaterial
//             color="#4c1d95" // Deep Indigo base
//             attach="material"
//             distort={0.5} // High distortion for "liquid" feel
//             speed={2} // Fast movement
//             roughness={0.1} // Very shiny
//             metalness={0.9} // Metallic look (Mercury/Water)
//             bumpScale={0.005}
//             clearcoat={1}
//             clearcoatRoughness={0.1}
//             radius={1}
//           />
//         </Sphere>

//         {/* Floating Droplets surrounding it */}
//         <Droplet position={[1.8, 1, 0]} scale={0.3} speed={3} />
//         <Droplet position={[-1.5, -1.2, 0.5]} scale={0.2} speed={2} />
//         <Droplet position={[0.5, 1.8, -1]} scale={0.25} speed={4} />
//       </Float>
//     </group>
//   );
// }

// // Helper for small droplets
// function Droplet({ position, scale, speed }: any) {
//   return (
//     <Sphere args={[1, 32, 32]} position={position} scale={scale}>
//       <MeshDistortMaterial
//         color="#8b5cf6" // Lighter violet for droplets
//         distort={0.4}
//         speed={speed}
//         roughness={0}
//         metalness={1}
//       />
//     </Sphere>
//   );
// }

// // === SCENE 2: LIQUID FLOW (For Center Layout) ===
// // Two vertical streams on the edges
// export function LiquidFlow() {
//   return (
//     <group>
//       {/* Background Ambience */}
//       <Sparkles
//         count={50}
//         scale={12}
//         size={4}
//         speed={0.4}
//         opacity={0.5}
//         color="#8b5cf6"
//       />

//       {/* Left Stream */}
//       <Float speed={3} floatIntensity={2} position={[-6, 0, 0]}>
//         <Sphere args={[1, 64, 64]} scale={[1, 4, 1]}>
//           <MeshDistortMaterial
//             color="#3b82f6"
//             distort={0.6}
//             speed={1.5}
//             metalness={0.8}
//           />
//         </Sphere>
//       </Float>

//       {/* Right Stream */}
//       <Float speed={4} floatIntensity={2} position={[6, 0, 0]}>
//         <Sphere args={[1, 64, 64]} scale={[1, 4, 1]}>
//           <MeshDistortMaterial
//             color="#8b5cf6"
//             distort={0.6}
//             speed={1.5}
//             metalness={0.8}
//           />
//         </Sphere>
//       </Float>
//     </group>
//   );
// }

// 3 ----------------------------------------------------
import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance, Float } from "@react-three/drei";
import * as THREE from "three";

// Configuration for the chaos
const COUNT = 250;
const COLORS = ["#6d5ce8", "#a78bfa", "#3b82f6", "#f472b6"]; // Indigo, Violet, Blue, Pink (Glitch)

export function NeonRain() {
  return (
    <group>
      {/* Left Rain Curtain - positioned far left to clear center text */}
      <RainSystem position={[-7, 0, 0]} colorSet={0} />

      {/* Right Rain Curtain - positioned far right */}
      <RainSystem position={[7, 0, 0]} colorSet={1} />

      {/* Floating Chaos Debris - rising slowly in the background */}
      <FloatingDebris />
    </group>
  );
}

function RainSystem({
  position,
  colorSet,
}: {
  position: [number, number, number];
  colorSet: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random data for rain streaks
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }).map(() => ({
      // Spread them wide on X (width of curtain) and deep on Z (depth)
      pos: [
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      speed: Math.random() * 0.2 + 0.1,
      scale: Math.random() * 0.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Rotate the entire curtain slightly for a "disorienting" feel
    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <group position={position} ref={groupRef} rotation={[0, 0, 0.1]}>
      <Instances range={COUNT}>
        {/* Long thin box for a "digital streak" look */}
        <boxGeometry args={[0.02, 1.5, 0.02]} />
        <meshBasicMaterial
          transparent
          opacity={0.6}
          toneMapped={false}
          color={colorSet === 0 ? "#8b5cf6" : "#3b82f6"}
        />

        {particles.map((data, i) => (
          <RainDrop key={i} {...data} />
        ))}
      </Instances>
    </group>
  );
}

function RainDrop({ pos, speed, scale, color }: any) {
  const ref = useRef<THREE.Group>(null);
  const [randomOffset] = useState(() => Math.random() * 100);

  useFrame((state) => {
    if (!ref.current) return;

    // Fall logic
    ref.current.position.y -= speed;

    // "Glitch" teleport: If it falls below -10, reset to top
    if (ref.current.position.y < -10) {
      ref.current.position.y = 10;
      // Randomize X slightly on reset for organic feel
      ref.current.position.x = pos[0] + (Math.random() - 0.5);
    }

    // Occasional "Glitch" Shake
    const t = state.clock.elapsedTime + randomOffset;
    if (Math.sin(t * 10) > 0.95) {
      ref.current.position.x += (Math.random() - 0.5) * 0.2;
    }
  });

  return (
    <Instance ref={ref} position={pos} scale={[1, scale, 1]} color={color} />
  );
}

function FloatingDebris() {
  return (
    <group>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={4} floatIntensity={2}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20, // Spread across whole screen
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 5,
            ]}
          >
            {/* Geometric "Artifacts" */}
            <octahedronGeometry args={[Math.random() * 0.3]} />
            <meshStandardMaterial
              color={COLORS[Math.floor(Math.random() * COLORS.length)]}
              wireframe={Math.random() > 0.5} // Mix solid and wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
