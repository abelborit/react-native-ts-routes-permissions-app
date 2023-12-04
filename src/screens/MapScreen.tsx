import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MapComponent} from '../components/MapComponent';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

export interface MapMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  image: string;
}

const mapLocationsData: MapMarkerProps[] = [
  {
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    title: 'Mapa1',
    description: 'Descripcion de Mapa 1',
    image: '../assets/custom-marker.png',
  },
  {
    coordinate: {
      latitude: 50.25825,
      longitude: -122.4354,
    },
    title: 'Mapa2',
    description: 'Descripcion de Mapa 2',
    image: '../assets/custom-marker.png',
  },
  {
    coordinate: {
      latitude: 10.62825,
      longitude: -122.4365,
    },
    title: 'Mapa3',
    description: 'Descripcion de Mapa 2',
    image: '../assets/custom-marker.png',
  },
];

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>

      {/* <MapView
        // provider={PROVIDER_GOOGLE} // para que en iOS utilice Google Maps y no Apple Maps. Si se comenta entonces en Android usará Google Maps y en iOS Apple Maps que son sus mapas por defecto. Puede ser que en el emulador de iOS Google Map esté lento pero en el dispositivo físico debería estar fluido
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}

      <MapComponent markers={mapLocationsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
