// src/components/ui/3d-pin.tsx
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function GeometricalShape(props: any) {
  const meshRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh
        {...props}
        ref={meshRef}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={hovered ? "#d4d4d8" : "#27272a"} // Zinc colors (light/dark compliant)
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export const BrandIcon3D = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      {/* dpr={[1, 2]} clamps pixel ratio to save battery on mobile */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <GeometricalShape position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};
