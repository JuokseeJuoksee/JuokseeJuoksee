import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ImageBackground } from '@react-navigation/native';
import Login from './Login';
import Rooms from './Rooms';
import { Ionicons} from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import { AsyncStorage } from'@react-native-async-storage/async-storage';
import CreateRoom from './CreateRoom';
import RoomNavigator from './RoomNavigator';

const Tab = createBottomTabNavigator();

export default function Navigator() {

  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    (async () => {
      try {
        let user = await AsyncStorage.getItem('logged')
        setUser(user)
        setIsLogged(true)
      } catch (error) {
        setIsLogged(false)        
      }
    })()
  })

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
  if (isLogged === false) {
    return (
      <NavigationContainer>      
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Kilpailut" component={RoomNavigator} options={{ headerShown: false}} />
                <Tab.Screen name="Luo" component={CreateRoom} />
            </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>      
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Rooms" component={Rooms} />
            </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
}