import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [dice, setDice] = useState(1);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);

    const sub = Accelerometer.addListener(({ x, y, z }) => {
      const totalMovement = Math.abs(x) + Math.abs(y) + Math.abs(z);

      // Detecta sacudida
      if (totalMovement > 2.2) {
        rollDice();
      }
    });

    setSubscription(sub);

    return () => {
      sub && sub.remove();
    };
  }, []);

  const rollDice = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    setDice(random);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Dado</Text>
      <Text style={styles.dice}>{dice}</Text>
      <Text style={styles.text}>Sacude el teléfono para lanzar el dado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  dice: {
    fontSize: 100,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
