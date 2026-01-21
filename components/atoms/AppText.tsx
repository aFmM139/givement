import { Text, TextProps } from 'react-native';
import "@/global.css";

interface AppTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'number';
  color?: 'primary' | 'secondary' | 'light' | 'white';
  bold?: boolean;
}

const variantStyles = {
  title: 'text-4xl',
  subtitle: 'text-2xl',
  body: 'text-base',
  caption: 'text-sm',
  number: 'text-6xl',
};

const colorStyles = {
  primary: 'text-purple-600',
  secondary: 'text-pink-500',
  light: 'text-white/70',
  white: 'text-white',
};

export function AppText({ 
  variant = 'body', 
  color = 'white',
  bold = false,
  className = '',
  children,
  ...props 
}: AppTextProps) {
  return (
    <Text 
      className={`
        ${variantStyles[variant]} 
        ${colorStyles[color]} 
        ${bold ? 'font-bold' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </Text>
  );
}