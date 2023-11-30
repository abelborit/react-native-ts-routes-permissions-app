import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import {PermissionsContext} from '../context/permissionsContext/PermissionsContext';
import {LoaderComponent} from '../components/LoaderComponent';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  MapScreen: undefined; // undefined significa que la ruta no tiene parámetros
  PermissionsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {permissionsNeeded} = useContext(PermissionsContext);

  if (permissionsNeeded.locationStatus === 'unavailable') {
    return <LoaderComponent />;
  }

  return (
    /* screenOptions={{}} para personalizar varias cosas */
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   elevation: 0, // quitar la linea abajo del header en Android
        //   shadowColor: 'transparent', // quitar la linea abajo del header en iOS
        //   backgroundColor: '#ddd',
        // },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      {permissionsNeeded.locationStatus === 'granted' ? (
        <Stack.Screen
          name="MapScreen"
          options={{title: 'Map'}}
          component={MapScreen}
        />
      ) : (
        <Stack.Screen
          name="PermissionsScreen"
          options={{title: 'Permissions'}}
          component={PermissionsScreen}
        />
      )}
    </Stack.Navigator>
  );
};
