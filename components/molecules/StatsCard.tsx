import { View } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { Icon } from '@/components/atoms/Icon';
import "@/global.css";

interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
}

export function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <View className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 items-center min-w-[100px]">
      <Icon name={icon} size="medium" className="mb-2" />
      <AppText variant="caption" color="light" className="mb-1">
        {label}
      </AppText>
      <AppText variant="subtitle" bold>
        {value}
      </AppText>
    </View>
  );
}