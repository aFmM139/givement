import { useEffect, useState } from 'react';
import "@/global.css";
import { View, Animated, Switch, Text } from 'react-native';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { detectShake } from '@/lib/core/logic/motion';
import { Header } from '@/components/molecules/Header';
import { DiceCard } from '@/components/molecules/DiceCard';
import { Dice3DCard } from '@/components/molecules/Dice3DCard';
import { DiceDisplay } from '@/components/molecules/DiceDisplay';
import { InstructionPanel } from '@/components/molecules/InstructionPanel';

export default function DiceGame() {
  const [dice, setDice] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [use3D, setUse3D] = useState(true); // Toggle entre 2D y 3D
  const scaleAnim = useState(new Animated.Value(1))[0];
  const rotateAnim = useState(new Animated.Value(0))[0];

  const { x, y, z } = useAccelerometer();

  useEffect(() => {
    if (detectShake(x, y, z)) {
      rollDice();
    }
  }, [x, y, z]);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setRollCount(prev => prev + 1);

    // Animación para el dado 2D
    if (!use3D) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        rotateAnim.setValue(0);
        setIsRolling(false);
      });
    } else {
      // Para el dado 3D, solo controlamos el tiempo de animación
      setTimeout(() => {
        setIsRolling(false);
      }, 1000); // Duración de la animación 3D
    }

    // Cambiar el número del dado
    const random = Math.floor(Math.random() * 6) + 1;
    setDice(random);
  };

  return (
    <View className="flex-1 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Header */}
      <Header 
        title="Magic Dice" 
        subtitle={`Lanzamientos: ${rollCount}`}
        icon="🎲"
      />

      {/* Toggle 2D/3D */}
      <View className="flex-row items-center justify-center px-6 py-3">
        <Text className="text-white text-lg mr-3">
          {use3D ? '3D' : '2D'}
        </Text>
        <Switch
          value={use3D}
          onValueChange={setUse3D}
          trackColor={{ false: '#767577', true: '#7C3AED' }}
          thumbColor={use3D ? '#EC4899' : '#f4f3f4'}
        />
      </View>

      {/* Dado Principal */}
      <View className="flex-1 items-center justify-center">
        {use3D ? (
          <Dice3DCard 
            value={dice}
            isRolling={isRolling}
            width={320}
            height={320}
          />
        ) : (
          <DiceCard 
            value={dice}
            scaleAnim={scaleAnim}
            rotateAnim={rotateAnim}
          />
        )}

        <DiceDisplay 
          value={dice}
          isRolling={isRolling}
        />
      </View>

      {/* Instrucciones */}
      <InstructionPanel 
        onManualRoll={rollDice}
        isRolling={isRolling}
      />
    </View>
  );
}