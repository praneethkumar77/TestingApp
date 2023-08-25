import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Input from 'react-native-elements';
import Colors from '../../utils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import COLORS from '../../utils/Colors';
import {deviceWidth} from '../../utils/Util';
import Geolocation from '@react-native-community/geolocation';

interface SearchScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const GooglePlacesInput: React.FC<SearchScreenProps> = ({navigation}) => {
  const [currentLoc, setCurrentLocation] = useState<any>({});
  const yourLocation = {
    description: 'Your Location',
    geometry: {location: currentLoc},
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('kckewcwee', position);
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        console.log('error in getcurrentlocation', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        fetchDetails={true}
        enablePoweredByContainer={false}
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        query={{
          key: 'AIzaSyCsjTBny6NYkAB7Gb6v1WCajXjpyyikexU',
          language: 'en',
        }}
        predefinedPlaces={[yourLocation]}
        currentLocation={true}
        currentLocationLabel="Current location"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('searchdetails', details?.geometry.location, data);

          navigation.replace('Details', {
            type: details?.geometry.location,
            text: data.description,
          });
        }}
        renderLeftButton={() => (
          <MaterialIcon
            name="chevron-left"
            size={28}
            color={'#333'}
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: COLORS.BaseBgColor,
              verticalAlign: 'middle',
              alignItems: 'center',
              padding: 5,
              height: 48,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              marginLeft: 1,
            }}
          />
        )}
        renderRightButton={() => (
          <MaterialIcon
            name="magnify"
            size={24}
            color={'#c5c5c5'}
            // onPress={() => navigation.goBack()}
            style={{marginRight: 10}}
          />
        )}
        renderRow={(item: any) => {
          console.log('row item data', item);
          return (
            <View
              style={{
                width: deviceWidth - 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <MaterialIcon
                name="navigation-variant-outline"
                color={COLORS.GRAY.DEFAULT}
                size={18}
              />
              <Text style={{paddingLeft: 8}}>{item.description}</Text>
            </View>
          );
        }}
        textInputProps={{
          InputComp: Input,
          // leftIcon: {
          //   type: 'font-awesome',
          //   name: 'chevron-left',
          //   color: 'black',
          //   size: 20,
          // },
          rightIcon: {
            type: 'font-awesome',
            name: 'search',
            color: 'black',
            size: 20,
          },
          errorStyle: {color: 'red'},
        }}
        onFail={error => console.error('error', error)}
        styles={{
          textInputContainer: {
            backgroundColor: 'white',
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: Colors.GRAY.DARK,
            width: deviceWidth - 20,
            alignSelf: 'center',
            borderRadius: 5,
          },
          textInput: {
            // height: 38,
            color: '#5d5d5d',
            fontSize: 16,
            alignSelf: 'center',
            marginHorizontal: 10,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </SafeAreaView>
  );
};

export default GooglePlacesInput;
