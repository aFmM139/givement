import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '@/global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1F2937' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="games/dice" />
      </Stack>
    </>
  );
}