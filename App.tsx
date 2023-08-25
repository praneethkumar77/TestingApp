import * as React from 'react';
import {DetailsScreen, HomeScreen} from './src/screens';
import Geocoder from 'react-native-geocoding';
import GooglePlacesInput from './src/screens/homeComponent/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
import Geolocation from '@react-native-community/geolocation';

// Geolocation.setRNConfiguration(config);
Geocoder.init('AIzaSyCsjTBny6NYkAB7Gb6v1WCajXjpyyikexU', {language: 'en'});
// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocation = require('react-native-geolocation-service');

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
