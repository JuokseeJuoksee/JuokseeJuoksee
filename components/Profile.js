import { View, Button } from "react-native";
import { app } from '../database/firebase'
import { getAuth } from "firebase/auth";

const auth = getAuth(app)

export default function Profile({user, setLogged}) {

    const logOut = () => {
        auth.signOut().then(() => setLogged(false))
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <Button 
                title="Kirjaudu ulos" 
                onPress={logOut}
                />

        </View>
    )
}