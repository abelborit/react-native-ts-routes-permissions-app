/* crear el provider que es un componente que vamos a utilizar para obtener la información de nuestro context y es quien envolverá al componente más alto para repartir la información a sus hijos. Aquí se va a definir el estado a través de una interface para ir viendo cómo quiero que se vea a futuro la aplicación */
import React, {useCallback, useEffect, useState} from 'react';
import {PermissionsContext} from './PermissionsContext';
import {
  PERMISSIONS,
  PermissionStatus,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {Alert, AppState, Platform} from 'react-native';

interface PermissionsProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* aquí es cómo quiero que luzca mi estado inicial que no necesariamente será el mismo que la interface del Context ya que en la función de abajo se crearán funciones (porque se hará uso de los reducers en algunas ocasiones o solo funciones simples sin reducers lo cual se puede eliminar su importación) las cuales serán añadidas al value y ahí ese value tiene que satisfacer todo lo que se solicita en la interface del Context */
export interface PermissionsProviderStateInterface {
  locationStatus: PermissionStatus;
}

const INITIAL_STATE: PermissionsProviderStateInterface = {
  locationStatus: 'unavailable',
};

export const PermissionsProvider = ({children}: PermissionsProviderProps) => {
  const [permissionsNeeded, setPermissionsNeeded] = useState(INITIAL_STATE);

  const askLocationPermission = useCallback(async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      // check -> chequear o revisar el estado del permiso
      // request -> solicitar el permiso al usuario

      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    if (permissionStatus === 'blocked') {
      // En caso de que el usuario seleccione "Don't allow"
      setPermissionsNeeded(prevPermissionsNeeded => ({
        ...prevPermissionsNeeded,
        locationStatus: 'blocked',
      }));

      /* tener en cuenta que al usar openSettings() en Android si me llevará directo a la pantalla de ajustes de la aplicación sea en modo desarrollo o modo producción pero en iOS en modo desarrollo no me lleva directamente ahí porque ese menú especializado de nuestra aplicación solo aparece en aplicaciones desplegadas pero cuando ya esté en producción (desplegado) ya se abrirá el espacio especializado de nuestra aplicación donde están los permisos y los ajustes que maneja nuestra aplicación */
      Alert.alert(
        'We need your location permission',
        'We will redirect you to the app permissions settings',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Modal'),
            style: 'cancel',
          },

          {
            text: 'Ok',
            onPress: () => openSettings(),
            style: 'default',
          },
        ],
        {
          /* para hacer click afuera de la alerta y salir de esa alerta y luego aparece otra alerta */
          cancelable: true,
          onDismiss: () => console.log('Dismiss Modal'),
        },
      );
    } else {
      /* En otros casos, actualiza el estado normalmente para quedarme con todos los permisos que ya tenía y también tener el nuevo que sería de la localización */
      /* En las funciones askLocationPermission y checkLocationPermission, se estaba utilizando permissionsNeeded directamente desde el estado como está abajo comentado. Tener en cuenta que, cuando usas un valor del estado dentro de una función de actualización de estado, React no garantiza que obtendrás el estado más reciente. Podrías considerar usar el formato de función en setPermissionsNeeded para garantizar que estás actualizando el estado basándote en la versión más reciente de la siguiente forma: */
      // setPermissionsNeeded({
      //   ...permissionsNeeded,
      //   locationStatus: permissionStatus,
      // });

      setPermissionsNeeded(prevPermissionsNeeded => ({
        ...prevPermissionsNeeded,
        locationStatus: permissionStatus,
      }));
    }
  }, []);

  const checkLocationPermission = useCallback(async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      // check -> chequear o revisar el estado del permiso
      // request -> solicitar el permiso al usuario

      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    /* para quedarme con todos los permisos que ya tenía y también tener el nuevo que sería de la localización */
    setPermissionsNeeded(prevPermissionsNeeded => ({
      ...prevPermissionsNeeded,
      locationStatus: permissionStatus,
    }));
  }, []);

  /* saber el estado de la aplicación, si está activa, si está en el background (o sea como en segundo plano), etc... */
  useEffect(() => {
    /* se agrega también esta función al useEffect() porque puede ser que se de un loading infinito al entrar a la aplicación ya que en el listenerAppStatusChange realiza el checkLocationPermission según el estado de la aplicación (activo, en segundo plano, etc) pero de esta forma lo ejecuta también al estar en la aplicación o cambiar alguna configuración del código ya que si se cambia el estado entonces se vuelve a disparar este useEffect(). Esto se puede ver mejor si se recarga la consola de Metro y se comenta esta línea ya que se verá que aparece el loading infinito */
    checkLocationPermission();

    const listenerAppStatusChange = AppState.addEventListener(
      'change',
      appStatus => {
        // console.log({appStatus});
        if (appStatus !== 'active') return;

        checkLocationPermission();
      },
    );

    return () => {
      listenerAppStatusChange.remove();
    };
  }, [checkLocationPermission]);

  return (
    <PermissionsContext.Provider
      value={{
        permissionsNeeded,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
