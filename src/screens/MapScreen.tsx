import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>

      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
