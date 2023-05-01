import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
LogBox.ignoreAllLogs(); //Ignore log notification, for now

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}


