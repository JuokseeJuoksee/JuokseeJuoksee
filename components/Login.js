import { useState } from "react";
import { View, Text, ImageBackground, TextInput } from "react-native";
import Image from '../assets/background.jpg'
import LoginButton from "./LoginButton";
import LoginFacebook from "./LoginFacebook";
import LoginGoogle from "./LoginGoogle";
import Register from "./Register";

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground 
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                resizeMode="cover"
                source={Image}
            >         
                <View style={{
                    height: '80%',
                    width: '90%',
                    backgroundColor: 'white',
                    opacity: 0.7,
                    borderRadius: 20,
                    alignItems: 'center'               
                }}> 
                    <Text style={{ fontSize: 25 }}>Kirjaudu sisään</Text>
                    <TextInput 
                        placeholder="  Käyttäjänimi tai email"
                        keyboardType="email-address"
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            opacity: 0.7,
                            borderColor: 'grey',
                            borderWidth: 1,
                            marginTop: 10
                        }}
                        onChangeText={username => setUsername(username)}
                        value={username} 
                    />
                    <TextInput 
                        placeholder="  Salasana"
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            opacity: 0.7,
                            borderColor: 'grey',
                            borderWidth: 1,
                            marginTop: 10
                        }}                     
                        onChangeText={pass => setPassword(pass)}
                        value={password}  
                    />
                    <View style= {{ margin: 20, width: '80%' }}>
                        <LoginButton />
                    </View>
                    <View style= {{ marginBottom: 20, width: '80%' }}>
                        <Register />
                    </View>
                    <View>
                        <Text>...tai rekisteröidy / kirjaudu käyttämällä:</Text>
                    </View>
                    <LoginGoogle />
                    <LoginFacebook />
                    
                </View>
            </ImageBackground>   
        </View>
    )
}