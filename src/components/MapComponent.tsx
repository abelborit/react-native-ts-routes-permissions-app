import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MapMarkerProps} from '../screens/MapScreen';
import {useLocation} from '../hooks/useLocation';
import {LoaderComponent} from './LoaderComponent';
import {FloatingActionButton} from './FloatingActionButton';
import MapView, {
  Polyline,
  // Marker,
  // PROVIDER_GOOGLE
} from 'react-native-maps';

interface MapComponentProp {
  markers?: MapMarkerProps[];
}

export const MapComponent = ({markers = []}: MapComponentProp) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const {
    hasLocation,
    initialPosition,
    currentLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>(null); // mantener la referencia a este mapa y tener acciones sobre este <MapView></MapView> como centrar la cámara, etc...
  const isFollowingUser = useRef<boolean>(true); // mantener la referencia para saber si se está siguiendo al usuario o no y por defecto está en true ya que desde que se entra al mapa se hace seguimiento

  const centerPosition = async () => {
    const userCurrentLocation = await getCurrentLocation();

    mapViewRef.current?.animateCamera({
      center: {
        latitude: userCurrentLocation.latitude,
        longitude: userCurrentLocation.longitude,
      },
    });

    isFollowingUser.current = true;
  };

  /* desde que se monta el componente entonces ya se hace el seguimiento al usuario */
  useEffect(() => {
    followUserLocation();

    /* hacer la función de limpieza para que cuando se salga de la aplicación o esté en segundo plano o se destruya el componente entonces no hayan fugas de memoria */
    return () => {
      stopFollowUserLocation();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFollowingUser.current) return;

    mapViewRef.current?.animateCamera({
      center: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
    });
  }, [currentLocation]);

  if (!hasLocation) {
    return <LoaderComponent text="Loading Location..." colorString="#a00" />;
  }

  return (
    <View style={styles.container}>
      <Text>MapComponent</Text>

      <Text>{JSON.stringify(markers, null, 3)}</Text>

      {true ? (
        <Text
          style={{
            marginVertical: 50,
            marginHorizontal: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Falta colocar las keys de la consola de Google para mostrar el mapa,
          una vez colocadas entonces borrar este texto y colocar el componente
          MapView
        </Text>
      ) : (
        <MapView
          // provider={PROVIDER_GOOGLE} // para que en iOS utilice Google Maps y no Apple Maps. Si se comenta entonces en Android usará Google Maps y en iOS Apple Maps que son sus mapas por defecto. Puede ser que en el emulador de iOS Google Map esté lento pero en el dispositivo físico debería estar fluido
          ref={element => (mapViewRef.current = element!)}
          style={{flex: 1}}
          showsUserLocation={true}
          initialRegion={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={() => (isFollowingUser.current = false)} // cuando se haga touch en la pantalla entonces lance una acción
        >
          {/* se puede colocar un marcador y usar una imagen que seleccionemos (o si no se usa entonces será la que tiene por defecto). Este <Marker /> se puede usar para otras cosas como colocar lugares importantes, destinos, etc. Se puede usar también para saber dónde está el usuario pero en este caso se utilizará el objeto que ya nos da el <MapView /> con información sobre dónde se encuentra el usuario. */}
          {/* {markers.map((markerElement, index) => (
          <Marker
            key={index}
            coordinate={markerElement.coordinate}
            title={markerElement.title}
            description={markerElement.description}
            image={require(markerElement.image)}
          />
        ))} */}

          {showPolyline ? (
            <Polyline
              coordinates={routeLines}
              strokeColor="#333"
              strokeWidth={3}
            />
          ) : null}
        </MapView>
      )}

      <FloatingActionButton
        iconName="brush-outline"
        onPressProp={() => setShowPolyline(prevState => !prevState)}
        sizeIcon={30}
        btnColor="#ca1919"
        styleProp={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />

      <FloatingActionButton
        iconName="compass-outline"
        onPressProp={() => centerPosition()}
        sizeIcon={40}
        btnColor="#1960ca"
        styleProp={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
