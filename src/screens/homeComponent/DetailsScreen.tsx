import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
  // TextInput,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Colors from '../../utils/Colors';
import {TextInput} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GooglePlacesInput from './SearchScreen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Input} from 'react-native-elements';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ParamListBase, useIsFocused} from '@react-navigation/native';
import {deviceHeight, deviceWidth} from '../../utils/Util';
import COLORS from '../../utils/Colors';

interface DetailsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: NativeStackScreenProps<ParamListBase>;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({navigation, route}) => {
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 17.385,
    longitude: 78.4867,
  });
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 17.385,
    longitude: 78.4867,
    latitudeDelta: 0.392768,
    longitudeDelta: 0.992736,
  });
  const [locValue, setLocValue] = useState<any>('');
  const [refresh, setRefresh] = useState<number>(0);
  const isFocussed = useIsFocused();

  useEffect(() => {
    console.log('jshfksjkfsd', route);
    if (route && route.params && route.params.type) {
      setLocValue(route.params.text);
      // setMarkerCoords({
      //   latitude: route.params.type.lat,
      //   longitude: route.params.type.lng,
      // });
      reverseGeocodeCoordinates(route.params.type.lat, route.params.type.lng);
      setCurrentRegion({
        latitude: route.params.type.lat,
        longitude: route.params.type.lng,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    } else {
      checkLocationPermission();
    }
  }, [refresh, isFocussed]);

  console.log('markercodrd', markerCoords);

  const checkLocationPermission = async () => {
    const permissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (permissionStatus === RESULTS.GRANTED) {
      console.log('permission granted');
      getCurrentLocation();
    } else {
      console.log('permission request');
      requestLocationPermission();
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.warn('Location permission denied.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const reverseGeocodeCoordinates = async (latitude: any, longitude: any) => {
    console.log('lat&long', latitude, longitude);
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      // setRefresh(refresh + 1);
      setLocValue(response.results[0].formatted_address);
      setMarkerCoords({
        latitude: response.results[0].geometry.location.lat,
        longitude: response.results[0].geometry.location.lng,
      });
      setCurrentRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
      console.log('Address:', response);
      const pincode = extractPincodeFromAddress(address);
      console.log('Pincode:', pincode);
    } catch (error) {
      console.log('error in reverseGeocodeCoordinates', error);
    }
  };

  const extractPincodeFromAddress = (address: any) => {
    const pincodeRegex = /\b\d{6}\b/g; // Assumes a 6-digit pincode format
    const matches = address.match(pincodeRegex);
    return matches ? matches[0] : 'N/A';
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('kckewcwee', position);
        reverseGeocodeCoordinates(latitude, longitude);
      },
      error => {
        console.log('error in getcurrentlocation', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleMapPress = (event: any) => {
    console.log('wckenw', event.nativeEvent.coordinate);
    setMarkerCoords(event.nativeEvent.coordinate);
    reverseGeocodeCoordinates(
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: Colors.WHITE,
            zIndex: 99,
            width: 320,
            top: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            height: 40,
            left: 10,
          }}
          onPress={() => navigation.navigate('Search')}>
          <TextInput
            style={{
              borderBottomWidth: 0,
              backgroundColor: Colors.WHITE,
              width: 280,
              borderRadius: 5,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              height: 40,
            }}
            value={locValue}
            onPressIn={() => {
              navigation.navigate('Search');
            }}
            activeUnderlineColor="white"
            outlineColor="white"
            placeholder="Search Location"
            underlineStyle={{display: 'none'}}
          />
          <MaterialIcon
            name="magnify"
            color={Colors.GRAY.DARK}
            size={22}
            style={{transform: [{rotate: '0deg'}]}}
          />
        </TouchableOpacity>


      
        

        <MapView
          style={styles.mapStyle}
          initialRegion={currentRegion}
          showsMyLocationButton
          showsUserLocation
          zoomTapEnabled
          scrollEnabled
          moveOnMarkerPress
          mapType="standard"
          zoomEnabled
          zoomControlEnabled
          userLocationAnnotationTitle="Your Location"
          customMapStyle={mapStyle}>
          <Marker
            draggable
            tappable={true}
            rotation={3}
            onPress={event => handleMapPress(event)}
            onCalloutPress={event => handleMapPress(event)}
            onMagicTap={() => console.log('jeeee')}
            coordinate={markerCoords}
            onDragEnd={event => handleMapPress(event)}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: deviceWidth - 20,
          paddingBottom: 20,
          paddingHorizontal: 10,
        }}>
        <Text>Latitude : {markerCoords.latitude.toFixed(2)}</Text>
        <Text>Longitude : {markerCoords.longitude.toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // bottom: 0,
    height: deviceHeight / 2,
  },
});
