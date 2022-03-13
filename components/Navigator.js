import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ImageBackground } from '@react-navigation/native';
import { Ionicons} from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import CreateRoom from './CreateRoom';
import RoomNavigator from './RoomNavigator';
import LoginNavigator from './LoginNavigator';

const Tab = createBottomTabNavigator();

export default function Navigator() {

  
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
  
      if (route.name === 'Login') {
        iconName = 'md-home';
      } else if (route.name === 'Kilpailut') {
        iconName = 'md-settings';
      } else if (route.name === 'Luo') {
        iconName = 'md-settings';
      }
  
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  });
  return (
    <NavigationContainer>      
          <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="Login" component={LoginNavigator} options={{ headerShown: false}}  />
              <Tab.Screen name="Kilpailut" component={RoomNavigator} options={{ headerShown: false}} />
              <Tab.Screen name="Luo" component={CreateRoom} />
          </Tab.Navigator>
    </NavigationContainer>
  );
  
}