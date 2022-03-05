
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stack } from '@react-navigation/native'
import HomeScreen from './Components/HomeScreen'
import Trainings from './Components/Trainings'
import StravaLogin from './Components/StravaLogin'
import Map from './Components/Map'

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="StravaLogin">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Trainings" component={Trainings} />
      <Stack.Screen name="StravaLogin" component={StravaLogin} />
      <Stack.Screen name="map" component={Map} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
