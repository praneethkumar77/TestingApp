import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen, GooglePlacesInput, HomeScreen} from '../screens';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Search" component={GooglePlacesInput} />
    </Stack.Navigator>
  );
};
export default Navigation;
