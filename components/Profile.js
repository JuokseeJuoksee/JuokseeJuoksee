import { View, Button } from "react-native";
import { app } from '../database/firebase'
import { getAuth } from "firebase/auth";
import { deleteUser } from '../phone_storage/asyncStorage'

const auth = getAuth(app)

export default function Profile({navigation}) {

    const logOut = async () => {
        // auth.signOut().then(navigation.navigate("Profiili"))
        try {
            const checkingOut = await auth.signOut()
            deleteUser()
        } catch (err) {
            console.log(err)
        }
        // navigation.navigate("Kilpailut")
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{ marginTop:50 }}>
            <Button 
                title="Kirjaudu ulos" 
                onPress={logOut}
                />
            </View>

        </View>
    )
}