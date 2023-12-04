import {useEffect, useRef, useState} from 'react';
import {LocationInterface} from '../interfaces/appInterfaces';
import Geolocation from '@react-native-community/geolocation';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false); // valor boolean para saber cuándo tengo una coordeanda del usuario, es decir, para no mostrar el mapa hasta que se tengan las coordenadas, ahí podría colocar un loading o algo similar
  const [routeLines, setRouteLines] = useState<LocationInterface[]>([]);
  const [initialPosition, setInitialPosition] = useState<LocationInterface>({
    latitude: 0,
    longitude: 0,
  });
  const [currentLocation, setCurrentLocation] = useState<LocationInterface>({
    latitude: 0,
    longitude: 0,
  });
  const watchId = useRef<number>(); // mantener la referencia al Geolocation.watchPosition() y no en un useState ya que no quiero que se re-renderice cada que cambie el estado
  const isMounted = useRef(true);

  const getCurrentLocation = (): Promise<LocationInterface> => {
    /* Geolocation.getCurrentPosition trabaja en base a callbacks entonces trabajarlo puede requerir un poco más de código y lógica para dar la respuesta del callback Success y callback Error y para eso entonces se hará que nuestro hook trabaje como si fuera una promesa para poder resolver o rechazar más facilmente */

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        }, // promise Success
        error => reject({error}), // promise Error
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        }, //Opciones
      );
    });
  };

  const followUserLocation = () => {
    /* Geolocation.watchPosition() devuelve un número que es como su identificador o id para reconocer este Geolocation.watchPosition lo cual se usará para poder detener el watchPosition */
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) return;

        const location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setCurrentLocation(location);
        setRouteLines(prevState => [...prevState, location]);

        setHasLocation(true);
      }, // callback Success
      error => console.log({error}), // callback Error
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10, // cada que pasen 10 metros me notificará o hacerlo más preciso pero cada que se haga una obtención de la posición entonces se va consumiento un poco la batería del usuario
      }, //Opciones
    );
  };

  const stopFollowUserLocation = () => {
    /* evaluación para ver si existe este identificador ya que puede ser que no se haya llamado al mapa o se salga de la aplicación u otros casos donde no haya su identificador */
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  /* evitar llamadas al cambiar el estado cuando el componente está desmontado y no nos aparezca el warning de "quiere cambiar el estado de un componente desmontado..." */
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    /* el Geolocation.getCurrentPosition() nos dará información sobre la ubicación del usuario como su latitud y longitud, precisión, velocidad, etc... */
    // Geolocation.getCurrentPosition(
    //   info => console.log(info), // callback Success
    //   error => console.log({error}), // callback Error
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000,
    //   }, //Opciones
    // );
    /* timeout (ms): es un valor positivo que representa el tiempo máximo (en milisegundos) que el dispositivo puede tomar para regresar a una posición y si no regresa nada entonces se puede manejar el error o hacer otra cosa. El valor predeterminado es 10 minutos. */
    /* maximumAge (ms): es un valor positivo que indica la antigüedad máxima en milisegundos de una posible posición almacenada en caché que se puede devolver. Si se establece en 0, significa que el dispositivo no puede usar una posición almacenada en caché y debe intentar recuperar la posición actual real. Si se configura en Infinity, el dispositivo siempre volverá a una posición almacenada en caché independientemente de su antigüedad. El valor predeterminado es INFINITY. */
    /* enableHighAccuracy (bool): es un valor booleano que representa si se debe usar GPS o no. Si se establece en verdadero, se solicitará una posición GPS. Si se establece en falso, se solicitará una ubicación WIFI. Esto al estar solicitando las coordenadas GPS entonces va a consumir un poco más la batería del dispositivo */
    // Geolocation.getCurrentPosition(
    //   ({coords}) => {
    //     setInitialPosition({
    //       latitude: coords.latitude,
    //       longitude: coords.longitude,
    //     });

    //     setHasLocation(true);
    //   }, // callback Success
    //   error => console.log({error}), // callback Error
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000,
    //   }, //Opciones
    // );

    /* lo anterior es cómo se trabajaría con callbacks aunque faltan hacer refactorizaciones y es como para mantener la referencia de lo que se hizo en un inicio */
    getCurrentLocation().then(location => {
      if (!isMounted.current) return;

      setInitialPosition(location);
      setCurrentLocation(location);
      setRouteLines(prevState => [...prevState, location]);
      setHasLocation(true);
    });
  }, []);

  return {
    hasLocation,
    initialPosition,
    currentLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  };
};
