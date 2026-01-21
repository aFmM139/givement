import { View } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { Button } from '@/components/atoms/Button';
import "@/global.css";


interface InstructionPanelProps {
  onManualRoll: () => void;
  isRolling: boolean;
}

export function InstructionPanel({ onManualRoll, isRolling }: InstructionPanelProps) {
  return (
    <View className="pb-12 px-6">
      <Button
        title="🎯 Lanzar Manualmente"
        variant="ghost"
        size="large"
        onPress={onManualRoll}
        disabled={isRolling}
        className="mb-4"
      />
      
      <AppText variant="caption" color="light" className="text-center">
         Sacude tu dispositivo para lanzar el dado automáticamente
      </AppText>
    </View>
  );
}