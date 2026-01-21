import { Accelerometer } from 'expo-sensors';

export const ACCELEROMETER_UPDATE_INTERVAL = 300;

export class AccelerometerService {
  private static instance: AccelerometerService;
  private subscription: any = null;

  private constructor() {}

  static getInstance(): AccelerometerService {
    if (!AccelerometerService.instance) {
      AccelerometerService.instance = new AccelerometerService();
    }
    return AccelerometerService.instance;
  }

  startListening(callback: (data: { x: number; y: number; z: number }) => void) {
    Accelerometer.setUpdateInterval(ACCELEROMETER_UPDATE_INTERVAL);
    
    this.subscription = Accelerometer.addListener(callback);
    return this.subscription;
  }

  stopListening() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  async isAvailable(): Promise<boolean> {
    return await Accelerometer.isAvailableAsync();
  }
}