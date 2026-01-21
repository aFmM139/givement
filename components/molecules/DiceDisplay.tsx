import { View } from 'react-native';
import "@/global.css";
import { AppText } from '../atoms/AppText';

interface DiceDisplayProps {
  value: number;
  isRolling: boolean;
}

export function DiceDisplay({ value, isRolling }: DiceDisplayProps) {
  return (
    <View className="mt-12 items-center">
      <AppText variant="number" bold className="mb-2">
        {value}
      </AppText>
      <AppText variant="body" color="light" className="text-lg">
        {isRolling ? '🎲 Lanzando...' : '✨ Listo'}
      </AppText>
    </View>
  );
}