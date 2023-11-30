import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PermissionsContext} from '../context/permissionsContext/PermissionsContext';
import {PermissionsButton} from '../components/PermissionsButton';

export const PermissionsScreen = () => {
  const {permissionsNeeded, askLocationPermission} =
    useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.textInfoPermission}>
        Es necesario el uso del GPS para utilizar esta aplicación
      </Text>

      <PermissionsButton
        title="Change Permission"
        onPressProp={askLocationPermission}
      />

      <Text style={{fontSize: 18, color: '#333'}}>
        {JSON.stringify(permissionsNeeded, null, 3)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 35,
    marginHorizontal: 10,
  },
  textInfoPermission: {
    textAlign: 'center',
    color: '#333',
    fontSize: 20,
  },
});
