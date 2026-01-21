import { Text } from 'react-native';
import "@/global.css";

interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

const sizeMap = {
  small: 'text-2xl',
  medium: 'text-4xl',
  large: 'text-5xl',
  xlarge: 'text-6xl',
};

export function Icon({ name, size = 'medium', className = '' }: IconProps) {
  return (
    <Text className={`${sizeMap[size]} ${className}`}>
      {name}
    </Text>
  );
}