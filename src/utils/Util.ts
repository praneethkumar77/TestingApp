import {Dimensions, Platform} from 'react-native';

export const {height: deviceHeight, width: deviceWidth} =
  Dimensions.get('window');

export const isIos = Platform.OS === 'ios';
