/**
 * Capacitor config · Mebusan iOS + Android wrapper
 * ──────────────────────────────────────────────────
 * Wraps the web app in a native shell for App Store / Play Store submission.
 *
 * Setup (one-time, on local dev machine):
 *   npm init -y
 *   npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
 *   npx cap init Mebusan com.mebusan.app
 *   npx cap add ios
 *   npx cap add android
 *   npx cap sync
 *   npx cap open ios   # opens Xcode for archive and submission
 *
 * App Store Connect setup:
 *   1. Register Bundle ID com.mebusan.app
 *   2. Create app record: App Name "Mebusan", Primary Lang English, Category Finance
 *   3. Use metadata from app-store-metadata.md
 *   4. Upload screenshots from screenshots/ folder
 *   5. Submit for review
 */

const config = {
  appId: 'com.mebusan.app',
  appName: 'Mebusan',

  // Points to the built web app; set to `https://mebusan.com/app/` for live wrap
  // or `dist` for a bundled local copy
  webDir: 'www',
  bundledWebRuntime: false,

  ios: {
    contentInset: 'always',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: true,
    scheme: 'Mebusan',
    backgroundColor: '#060504',
    // Hide status bar to match our dark theme
    preferredContentMode: 'mobile'
  },

  android: {
    backgroundColor: '#060504',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    hideLogs: true
  },

  server: {
    // Production: point at live site. For dev, comment out to use local www/
    url: 'https://mebusan.com/app/',
    cleartext: false,
    androidScheme: 'https',
    allowNavigation: [
      'mebusan.com',
      '*.mebusan.com'
    ]
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#060504',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      useDialog: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#060504',
      overlaysWebView: true
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true
    }
  }
};

module.exports = config;
