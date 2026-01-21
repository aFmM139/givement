import { Pressable, Text, PressableProps } from 'react-native';
import "@/global.css";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const variantStyles = {
  primary: 'bg-white',
  secondary: 'bg-purple-600',
  outline: 'bg-transparent border-2 border-white',
  ghost: 'bg-white/20 backdrop-blur-lg',
};

const textVariantStyles = {
  primary: 'text-purple-600',
  secondary: 'text-white',
  outline: 'text-white',
  ghost: 'text-white',
};

const sizeStyles = {
  small: 'px-4 py-2',
  medium: 'px-6 py-3',
  large: 'px-8 py-4',
};

const textSizeStyles = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

export function Button({ 
  title, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  ...props 
}: ButtonProps) {
  return (
    <Pressable
      className={`
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        rounded-full items-center justify-center
        ${disabled ? 'opacity-50' : ''}
      `}
      disabled={disabled}
      {...props}
    >
      <Text className={`${textVariantStyles[variant]} ${textSizeStyles[size]} font-bold`}>
        {title}
      </Text>
    </Pressable>
  );
}