import * as React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { Button } from 'react-native'
import axios from 'axios'
import { app } from '../database/firebase'
import { getAuth} from "firebase/auth"
import { db } from '../database/firebase'
import { push, ref, set } from "firebase/database"

const discovery = {
    authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
  };

const auth = getAuth(app)

export default function StravaButton() {

    const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: '76862',
          scopes: ['activity:read_all'],
          redirectUri: "exp://127.0.0.1:19000/redirect", //productissa expon oma redirect osote
        
        },
        discovery
      );
      
    React.useEffect(() => {
        if (response?.type === 'success') {
          const { code } = response.params
          getAthleteTokens(code)
          }
    }, [response]);

    const getAthleteTokens = (code) => {
        axios.post(`https://www.strava.com/oauth/token?client_id=76862&client_secret=67401766aa8757e4f2c742595091a8d3014137c6&code=${code}&grant_type=authorization_code`)
        .then(res => {
            console.log(res.data)
            putTokensToUser(res.data)})
        .catch(err => console.error(err))
    }

    const putTokensToUser = (tokens) => {
        set(
            ref(db, 'users/' + auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                athlete_id: tokens.athlete.id
            }
        )
        .catch(err => Alert.alert("Jokin meni pieleen"))
    }


    return(
       
        <Button
        disabled={!request}
        title="Kirjaudu Stravaan"
        onPress={() => {
        promptAsync();
        }}
        />
    )
}