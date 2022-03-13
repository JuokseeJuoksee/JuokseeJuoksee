import { useEffect, useState } from "react";
import { View, Text, ImageBackground, TextInput, Button } from "react-native";
import Image from '../assets/background.jpg'
import LoginButton from "./LoginButton";
import LoginFacebook from "./LoginFacebook";
import LoginGoogle from "./LoginGoogle";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../database/firebase'
import Profile from "./Profile";

const auth = getAuth(app)

export default function Login({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoggedInStatus(true)
            } else {
                return
            }
        })
    }, [])

    const setLoggedInStatus = (status) => {
        setLogged(status)
    }

    const EmptyemailAndPassword = () => {
        setEmail('')
        setPassword('')
    }

    // JOS KÄYTTÄJÄ KIRJAUTEENA NIIN NÄYTETÄÄN PROFIILI JA ULOSKIRJAUTUMINEN
    if (logged) {
        return <Profile user={user} navigation={navigation} setLogged={setLoggedInStatus} />
    } else {
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
                            onChangeText={username => setEmail(username)}
                            value={email} 
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
                            <LoginButton email={email} password={password} empty={EmptyemailAndPassword} />
                        </View>
                        <View style= {{ marginBottom: 20, width: '80%' }}>
                            <Button 
                                title="Rekisteröidy" 
                                onPress={() => navigation.navigate("Rekisteröidy")}
                            />
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

    
}