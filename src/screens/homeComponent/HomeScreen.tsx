import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Image, Button} from 'react-native';
import Validation from '../../utils/Validation';
import * as Webservices from '../../network/Webservices';
import * as getendPoint from '../../network/endPoints';
import axios from 'axios';
import {usersData} from '../../../__tests__/networkCalls';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');

  const onFormValidation = (fieldName: string, isFocus: boolean) => {
    let errorFields = [];

    //Validation messgae for username will be set to the state when user removes focus from inpit
    if (fieldName === '' || fieldName === 'name') {
      if (!isFocus) {
        // Validating username and it should only be allowing characters
        if (!username || username == '' || !Validation.isValidName(username)) {
          setNameErrorText('Enter Valid Name');
          errorFields.push('name');
        }
      } else {
        setNameErrorText('');
      }
    }
    //Validation messgae for password will be set to the state when user removes focus from inpit
    if (fieldName === '' || fieldName === 'password') {
      if (!isFocus) {
        // Validating password and it will allow characters and numbers not special symbols

        if (
          !password ||
          password == '' ||
          !Validation.isValidPassword(password)
        ) {
          setPasswordErrorText('Enter Valid Password');
          errorFields.push('password');
        }
      } else {
        setPasswordErrorText('');
      }
    }

    return !(errorFields.length > 0);
  };

  const testCheck = async () => {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username: 'kminchelle',
      password: '0lelplR',
    });

    console.log('cnknewnkckew', response.data);
  };

  useEffect(() => {
    testCheck();
  }, []);

  const onPressLogin = () => {
    if (onFormValidation('', false)) {
      console.log('Logged In Successfull');

      // setButtonLoading(true);
      Webservices.callPostApi(
        getendPoint.default.LOGIN,
        {
          username: username,
          password: password,
        },
        '',
      )
        .then(res => {
          //If the response from the API is success, we store the token and userinfo in redux
          //After that we navigate the user to homescreen
          console.log('sacjka', res);
          if (res.data && res.status == 200) {
            // Store.dispatch(wpActions.saveToken(res.data.token));
            // Store.dispatch(wpActions.saveUser(res.data));
            navigation.navigate('DetailsScreen');
          }

          // Toast.show({
          //   type: 'success',
          //   text1: 'Logged in successfully!',
          // });

          // setButtonLoading(false);
          // navigation.replace('HomeScreen');
        })
        .catch(err => {
          let response = err.response;
          if (response.data?.message) {
            // Toast.show({
            //   type: 'error',
            //   text1: response.data.message
            //     ? response.data.message
            //     : 'Some error occured',
            // });
          }
          // setButtonLoading(false);
        });
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Image
          source={require('../../assets/images/login.png')}
          style={{width: 300, height: 300}}
        />
        <Text
          testID="login-text"
          style={{fontSize: 24, fontWeight: '600', color: '#162350'}}>
          Login
        </Text>
        <View style={{width: 300, marginVertical: 20}}>
          <View style={{marginBottom: 15}}>
            <TextInput
              testID="user input"
              value={username}
              placeholder="Enter Name"
              // placeholderTextColor={'#ededed'}
              onChangeText={(text: any) => setUserName(text)}
              style={{
                borderWidth: 0.4,
                color: '#333',
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 5,
                borderColor: nameErrorText ? 'red' : '#333',
              }}
              onBlur={() => {
                onFormValidation('name', false);
              }}
              onFocus={() => {
                onFormValidation('name', true);
              }}
            />
            {nameErrorText ? (
              <Text style={{marginHorizontal: 5, color: 'red'}}>
                {nameErrorText}
              </Text>
            ) : null}
          </View>
          <View style={{marginBottom: 15}}>
            <TextInput
              testID="user pass"
              placeholder="Enter Password"
              value={password}
              onChangeText={(text: any) => setPassword(text)}
              style={{
                borderWidth: 0.4,
                color: '#333',
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 5,
                borderColor: passwordErrorText ? 'red' : '#333',
              }}
              onBlur={() => {
                onFormValidation('password', false);
              }}
              onFocus={() => {
                onFormValidation('password', true);
              }}
            />
            {passwordErrorText ? (
              <Text style={{marginHorizontal: 5, color: 'red'}}>
                {passwordErrorText}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{width: 120, alignSelf: 'center'}}>
          <Button
            title="Login"
            testID="login button"
            color={'#162350'}
            onPress={onPressLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
