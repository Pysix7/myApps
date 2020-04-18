import React from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import Navigator from './routes/drawer';

export default function App() {
  const [fontsLoaded] = useFonts({
    'cyberpunk': require('./assets/fonts/Cyberpunk.ttf'),
  });

  if (fontsLoaded) {
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading />
    )
  }
};