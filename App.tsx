import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {PermissionsProvider} from './src/context/permissionsContext/PermissionsProvider';

export const App = () => {
  return (
    <PermissionsProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PermissionsProvider>
  );
};
