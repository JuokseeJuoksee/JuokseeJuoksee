import  AsyncStorage  from'@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (err) {
        Alert.alert("Jokin meni pieleen", "Käyttäjän tallennus epäonnistui...")
    }
}

const getUserData = async () => {
    try {
        const user = await AsyncStorage.getItem('user')
        return JSON.parse(user)
    } catch (err) {
        Alert.alert("Jokin meni pieleen", "Käyttäjän hakeminen epäonnistui...")
    }
}

module.exports = { saveUser, getUserData }