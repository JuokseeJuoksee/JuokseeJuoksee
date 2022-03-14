import { Button, Alert } from "react-native"
import { app } from '../database/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { db } from '../database/firebase'
import { push, ref } from "firebase/database"
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import axios from "axios"

const auth = getAuth(app)

const discovery = {
    authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
  }; 

  
export default function RegisterButton({navigation, email, password, passwordAgain}) {

    const [request, response, promptAsync]  = useAuthRequest(
        {
          clientId: '76862',
          scopes: ['activity:read_all'],
          redirectUri: "exp://127.0.0.1:19000/redirect", //productissa expon oma redirect osote
        
        },
        discovery
    )
    
    const register = () => {
        if (email === "" || password !== passwordAgain || password === "") {
            Alert.alert("Tarkista antamasi tiedot", "Yritä uudelleen...")
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                promptAsync()             
            })
            .catch(err => console.error(err))
        }
    }

    const addUserToDatabase = (tokens) => {


        tokens ? push(
            ref(db, 'users'), {
                userId: auth.currentUser.uid,
                photoUrl: auth.currentUser.photoURL,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                athlete_id: tokens.id
            
            }
        )
        .catch(err => Alert.alert("Jokin meni pieleen"))
        :
        
        push(
            ref(db, 'users'), {
                userId: auth.currentUser.uid,
                photoUrl: auth.currentUser.photoURL,
            }
        )
        .catch(err => Alert.alert("Jokin meni pieleen"))

    }

    if (response?.type === 'success') {
        const { code } = response.params
        const tokens = getStravaTokens(code)
        addUserToDatabase(tokens)   
    } 


    const getStravaTokens = () => {
        axios.post(`https://www.strava.com/oauth/token?client_id=76862&client_secret=67401766aa8757e4f2c742595091a8d3014137c6&code=${code}&grant_type=authorization_code`)
        .then(response => {
            return {
                access_token : response.data.access_token,
                refresh_token : response.data.refresh_token,
                id : response.data.athlete.id
            }
        })    
    }


    return (
        <Button 
            title="Rekistöidy"
            onPress={register}
        />
    )
}