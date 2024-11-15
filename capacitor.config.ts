import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'iClinicBot',
  webDir: 'www',
  plugins: {
    StatusBar: {
      style: 'Light', // Garante que a barra de status fique clara
    },
  },
};

export default config;
