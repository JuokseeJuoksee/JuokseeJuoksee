import { View, Text, ImageBackground } from "react-native";
import Chat from "./Chat";
import Image from '../assets/background.jpg'

export default function Room({ navigation, route }) {

    const { room } = route.params

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
                <Text>Mukana ketkä</Text>    
            </View>
            <View style={{ flex: 1, marginBottom: 100 }}>
                <Chat room={room} />  
            </View>
            
            
        </View>
        </ImageBackground>
    )
}