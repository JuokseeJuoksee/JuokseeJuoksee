import { View, Text, ImageBackground } from "react-native"
import Chat from "./Chat"
import Image from '../assets/background.jpg'
import { Button } from "react-native"
import { getAuth} from "firebase/auth"
import { app } from '../database/firebase'
import { push, ref, set,update } from "firebase/database"
import { db } from '../database/firebase'

const auth = getAuth(app)

export default function Room({ navigation, route }) {

    const { room } = route.params

    const userToRoom = () => {
        update(
            ref(db, `rooms/${room[0]}/` + 'users'),{id : auth.currentUser.uid} 
        )

    }

    return (
        <ImageBackground
            style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            resizeMode="cover"
            source={Image}
        >
        <View
            style={{
                flex: 1,
                alignItems: "center"
            }}
        >
            
            {/* <Text style={{ fontSize: 20, margin: 20 }}>{room[1].roomname}</Text> */}
            <View style={{ flex: 1 }}>
                <Text>Tähän tulee taulukko tilanteesta</Text>    
            </View>
            <View style={{ flex: 1 }}>
                <Button
                 title="liity huoneeseen"
                 onPress={userToRoom}
                ></Button>    
            </View>
            <View style={{ flex: 1, marginBottom: 100 }}>
                <Chat room={room} />  
            </View>
            
            
        </View>
        </ImageBackground>
    )
}