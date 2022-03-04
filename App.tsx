// Libs
import React from 'react';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

// Components
import { Home } from './src/screens/Home';
import { AuthProvider } from './src/hooks/auth';

// Styles
import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';

// Renderer
export default function App() {
  const [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    DMSans_400Regular
  });

  // Check if the fonts are loaded before rendering the app
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AuthProvider>
        <Home />
      </AuthProvider>
    </ThemeProvider>
  );
}