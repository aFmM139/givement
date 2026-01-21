import { View, Animated } from 'react-native';
import { DiceFace } from '../atoms/DiceFace';
import "@/global.css";

interface DiceCardProps {
  value: number;
  scaleAnim: Animated.Value;
  rotateAnim: Animated.Value;
}

export function DiceCard({ value, scaleAnim, rotateAnim }: DiceCardProps) {
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [
          { scale: scaleAnim },
          { rotate: spin },
        ],
      }}
      className="bg-white rounded-3xl p-12 shadow-2xl items-center justify-center"
    >
      <DiceFace value={value} size="xlarge" />
    </Animated.View>
  );
}