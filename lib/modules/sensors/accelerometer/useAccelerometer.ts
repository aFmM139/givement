import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { ACCELEROMETER_UPDATE_INTERVAL } from './accelerometer.service';

export function useAccelerometer() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    Accelerometer.setUpdateInterval(ACCELEROMETER_UPDATE_INTERVAL);
    
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return data;
}