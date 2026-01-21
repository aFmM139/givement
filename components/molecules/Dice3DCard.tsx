import React, { useRef, Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';

interface Dice3DCardProps {
  value: number;
  isRolling: boolean;
  width?: number;
  height?: number;
}

// Mapeo de valores del dado a rotaciones (en radianes)
// Ajustado para que coincidan los números con las caras visibles
const DICE_ROTATIONS: Record<number, [number, number, number]> = {
  1: [0, 0, 0],                      // Cara 1 al frente
  2: [0, -Math.PI / 2, 0],           // Cara 2 a la derecha
  3: [0, Math.PI, 0],                // Cara 3 atrás
  4: [0, Math.PI / 2, 0],            // Cara 4 a la izquierda
  5: [Math.PI / 2, 0, 0],            // Cara 5 arriba
  6: [-Math.PI / 2, 0, 0],           // Cara 6 abajo
};

// Función de interpolación lineal
function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

// Componente del dado 3D (todo inline, sin imports externos)
function Dice3DInline({ 
  value, 
  isRolling 
}: { 
  value: number; 
  isRolling: boolean;
}) {
  const meshRef = useRef<any>(null);
  const targetRotation = useRef(DICE_ROTATIONS[value]);
  const dotRadius = 0.15;
  const dotDepth = 0.05;
  const offset = 0.5;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (isRolling) {
      meshRef.current.rotation.x += delta * 5;
      meshRef.current.rotation.y += delta * 3;
      meshRef.current.rotation.z += delta * 2;
    } else {
      const [targetX, targetY, targetZ] = targetRotation.current;
      meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, targetX, 0.1);
      meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, targetY, 0.1);
      meshRef.current.rotation.z = lerp(meshRef.current.rotation.z, targetZ, 0.1);
    }
  });

  React.useEffect(() => {
    targetRotation.current = DICE_ROTATIONS[value];
  }, [value]);

  // Configuración de puntos para cada cara
  const dotPatterns: Record<number, Array<[number, number, number]>> = {
    1: [[0, 0, 1.01]],
    2: [[-offset, offset, 1.01], [offset, -offset, 1.01]],
    3: [[-offset, offset, 1.01], [0, 0, 1.01], [offset, -offset, 1.01]],
    4: [[-offset, offset, 1.01], [offset, offset, 1.01], [-offset, -offset, 1.01], [offset, -offset, 1.01]],
    5: [[-offset, offset, 1.01], [offset, offset, 1.01], [0, 0, 1.01], [-offset, -offset, 1.01], [offset, -offset, 1.01]],
    6: [[-offset, offset, 1.01], [offset, offset, 1.01], [-offset, 0, 1.01], [offset, 0, 1.01], [-offset, -offset, 1.01], [offset, -offset, 1.01]],
  };

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      
      {/* Cara frontal (1) */}
      {dotPatterns[1].map((pos, i) => (
        <mesh key={`face1-${i}`} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[dotRadius, dotRadius, dotDepth, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Cara derecha (2) */}
      {dotPatterns[2].map((pos, i) => (
        <mesh key={`face2-${i}`} position={[1.01, pos[1], pos[0]]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[dotRadius, dotRadius, dotDepth, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Cara trasera (3) */}
      {dotPatterns[3].map((pos, i) => (
        <mesh key={`face3-${i}`} position={[pos[0], pos[1], -1.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[dotRadius, dotRadius, dotDepth, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Cara izquierda (4) */}
      {dotPatterns[4].map((pos, i) => (
        <mesh key={`face4-${i}`} position={[-1.01, pos[1], -pos[0]]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[dotRadius, dotRadius, dotDepth, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Cara superior (5) */}
      {dotPatterns[5].map((pos, i) => (
        <mesh key={`face5-${i}`} position={[pos[0], 1.01, -pos[1]]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[dotRadius, dotRadius, dotDepth, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Cara inferior (6) */}
      {dotPatterns[6].map((pos, i) => (
        <mesh key={`face6-${i}`} position={[pos[0], -1.01, pos[1]]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[dotRadius, dotRadius, dotDepth, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </mesh>
  );
}

export function Dice3DCard({ 
  value, 
  isRolling, 
  width = 300, 
  height = 300 
}: Dice3DCardProps) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true 
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        <Suspense fallback={null}>
          <Dice3DInline value={value} isRolling={isRolling} />
        </Suspense>

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});