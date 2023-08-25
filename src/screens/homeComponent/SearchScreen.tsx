import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Input from 'react-native-elements';
import Colors from '../../utils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import COLORS from '../../utils/Colors';
import {deviceWidth} from '../../utils/Util';

interface SearchScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const GooglePlacesInput: React.FC<SearchScreenProps> = ({navigation}) => {
  const homePlace = {
    description: 'Current Location',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  };
  const workPlace = {
    description: 'Work',
    geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        fetchDetails={true}
        enablePoweredByContainer={false}
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        query={{
          key: '--Type Your Api Key Here--',
          language: 'en',
        }}
        predefinedPlaces={[homePlace]}
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
            size={24}
            color={'#c5c5c5'}
            onPress={() => navigation.goBack()}
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
                // borderBottomWidth: 0.5,
                // borderBottomColor: COLORS.GRAY.LIGHT,
                width: deviceWidth - 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
                // paddingVertical: 1,
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
            marginTop: 10,
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
