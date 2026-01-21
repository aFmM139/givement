// Configuración del acelerómetro
export const SHAKE_THRESHOLD = 2.2;
export const ACCELEROMETER_UPDATE_INTERVAL = 300;

// Caras del dado (usando emojis de dados reales)
export const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Alternativamente, puedes usar números o puntos
export const DICE_NUMBERS = [1, 2, 3, 4, 5, 6];

// Colores del tema
export const COLORS = {
  primary: '#7C3AED',
  secondary: '#EC4899',
  background: '#1F2937',
  backgroundLight: '#374151',
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// Configuración de animaciones
export const ANIMATION = {
  diceRollDuration: 300,
  scaleDuration: 150,
  bounceDuration: 200,
  dice3DRollDuration: 1000, // Duración del giro 3D
};

// Límites del juego
export const GAME_CONFIG = {
  minDiceValue: 1,
  maxDiceValue: 6,
  cooldownMs: 500, // Tiempo mínimo entre lanzamientos
};

// Configuración 3D del dado
export const DICE_3D_CONFIG = {
  size: 2, // Tamaño del cubo
  dotRadius: 0.15, // Radio de los puntos
  dotDepth: 0.05, // Profundidad de los puntos
  colors: {
    dice: '#ffffff', // Color del dado
    dots: '#1a1a1a', // Color de los puntos
  },
  lighting: {
    ambient: 0.5,
    point: 1,
    spot: 0.5,
  },
  camera: {
    position: [0, 0, 8],
    fov: 50,
  },
  rotation: {
    speed: {
      x: 5,
      y: 3,
      z: 2,
    },
  },
};