import { View } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { Icon } from '@/components/atoms/Icon';
import "@/global.css";

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export function Header({ title, subtitle, icon }: HeaderProps) {
  return (
    <View className="pt-16 pb-6 px-6">
      <View className="flex-row items-center justify-center mb-2">
        {icon && <Icon name={icon} size="medium" className="mr-2" />}
        <AppText variant="title" bold className="text-center">
          {title}
        </AppText>
      </View>
      {subtitle && (
        <AppText variant="body" color="light" className="text-center mt-2">
          {subtitle}
        </AppText>
      )}
    </View>
  );
}