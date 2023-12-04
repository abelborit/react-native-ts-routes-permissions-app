import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface FloatingActionButtonProps {
  iconName: string;
  styleProp?: StyleProp<ViewStyle>;
  sizeIcon?: number;
  btnColor?: string;
  onPressProp: () => void;
}

export const FloatingActionButton = ({
  iconName,
  sizeIcon = 40,
  styleProp = {},
  btnColor = '#333',
  onPressProp,
}: FloatingActionButtonProps) => {
  return (
    <View style={[styles.container, styleProp]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressProp}
        style={{...styles.FabBtn, backgroundColor: btnColor}}>
        <Icon name={iconName} size={sizeIcon} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  FabBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});
