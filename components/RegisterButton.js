import { Button, Alert } from "react-native"
import { app } from '../database/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { db } from '../database/firebase'
import { push, ref, set } from "firebase/database"
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import axios from "axios"
import React from 'react'

const auth = getAuth(app)

const discovery = {
    authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
  }; 

  
export default function RegisterButton({navigation, email, password, passwordAgain}) {

    
    const register = () => {
        if (email === "" || password !== passwordAgain || password === "") {
            Alert.alert("Tarkista antamasi tiedot", "Yritä uudelleen...")
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                addUserToDatabase()       
            })
            .catch(err => console.error(err))
        }
    }

    const addUserToDatabase = () => {

        set(
            ref(db, 'users/' + auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                photoUrl: auth.currentUser.photoURL,
            }
        )
        .catch(err => Alert.alert("Jokin meni pieleen"))

    }


    return (
        <Button 
            title="Rekistöidy"
            onPress={register}
        />
    )
}