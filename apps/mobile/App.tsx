import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootNavigator } from './src/navigation/RootNavigator';
import { OnboardingScreen } from './src/screens/OnboardingScreen';

const ONBOARDING_KEY = 'barkspark_onboarding_complete';

export default function App() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      const flag = await AsyncStorage.getItem(ONBOARDING_KEY);
      setOnboarded(flag === 'true');
      setReady(true);
    })();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboarded(true);
  };

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      {onboarded ? (
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      ) : (
        <OnboardingScreen onDone={completeOnboarding} />
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
