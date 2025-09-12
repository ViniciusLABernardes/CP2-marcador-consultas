import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './src/routes';
import theme from './src/styles/theme';
import { StatusBar } from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({Arimo : require('./assets/fonts/Arimo/static/Arimo-Medium.ttf')});
  if(!fontsLoaded){
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
     <AuthProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={theme.colors.primary}/>
      <AppNavigator/>
     </AuthProvider>
    </ThemeProvider>
  );
}