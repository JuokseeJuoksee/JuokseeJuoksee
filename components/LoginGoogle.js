import { ImageBackground, Pressable, Alert } from "react-native";
import Google from '../assets/google.png'

export default function LoginGoogle() {


    return (
        <Pressable style={{
            width: '80%',
            height: 60,
            margin: 10
        }}
            onPress={() => Alert.alert("pressed")}
            
            
        >
            <ImageBackground
                source={Google}
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                resizeMode="cover"
            >
            </ImageBackground>
        </Pressable>
    )
}