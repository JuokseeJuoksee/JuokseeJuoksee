import { useState } from 'react';
import { View, Button, ImageBackground, Text, TextInput } from 'react-native';
import Image from '../assets/runner.png'

export default function Register({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={{
            flex:1,
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
                    <Text style={{ fontSize:20, marginBottom: 20 }}>Tervetuloa rekisteröitymään!</Text>
                </View>

            </ImageBackground>


        </View>
    )
}