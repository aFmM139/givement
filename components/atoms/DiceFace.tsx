import { Text, View } from 'react-native';
import { DICE_FACES } from '@/lib/core/constants';
import "@/global.css";

interface DiceFaceProps {
  value: number;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const sizeMap = {
  small: 'text-4xl',
  medium: 'text-6xl',
  large: 'text-8xl',
  xlarge: 'text-9xl',
};

export function DiceFace({ value, size = 'large' }: DiceFaceProps) {
  const validValue = Math.max(1, Math.min(6, value));
  
  return (
    <View className="items-center justify-center">
      <Text className={`${sizeMap[size]} text-center`}>
        {DICE_FACES[validValue - 1]}
      </Text>
    </View>
  );
}