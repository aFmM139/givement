import { View } from 'react-native';
import { Link } from 'expo-router';
import { AppText } from '@/components/atoms/AppText';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import "@/global.css";

export default function Index() {
  return (
    <View className="flex-1 bg-gradient-to-br from-purple-600 to-blue-600 items-center justify-center p-6">
      <Icon name="🎲" size="xlarge" className="mb-4" />
      
      <AppText variant="title" bold className="mb-4 text-center">
        GiveMentApp
      </AppText>
      
      <AppText variant="body" color="light" className="mb-12 text-center px-4">
        Lanza los dados y comenzemos a jugar
      </AppText>
      
      <Link href="/games/dice" asChild>
        <Button 
          title="¿Jugamos?"
          variant="primary"
          size="large"
        />
      </Link>
      
      <AppText variant="caption" color="light" className="mt-8 text-center">
        Sacude tu telefono para empezar
      </AppText>
    </View>
  );
}