
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bd66a4ff6b5c47ca82c3403f650d518a',
  appName: 'Fil et Toile Studio',
  webDir: 'dist',
  server: {
    url: "https://bd66a4ff-6b5c-47ca-82c3-403f650d518a.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    buildOptions: {
      compileSdkVersion: 35,
      targetSdkVersion: 35,
      minSdkVersion: 24
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f97316",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
