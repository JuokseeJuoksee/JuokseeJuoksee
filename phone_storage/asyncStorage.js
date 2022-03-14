import  AsyncStorage  from'@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (err) {
        Alert.alert("Jokin meni pieleen", "Käyttäjän tallennus epäonnistui...")
    }
}

const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user')
        return JSON.parse(user)
    } catch (err) {
        Alert.alert("Jokin meni pieleen", "Käyttäjän hakeminen epäonnistui...")
    }
}

const deleteUser = async () => {
    try {
        await AsyncStorage.removeItem('user')
    } catch (err) {
        Alert.alert("Jokin meni pieleen", "Käyttäjän poistaminen epäonnistui...")
    }

}

module.exports = { saveUser, getUser, deleteUser }