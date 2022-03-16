import { View, Text, ImageBackground } from "react-native"
import Chat from "./Chat"
import Image from '../assets/background.jpg'
import { Button } from "react-native"
import { getAuth} from "firebase/auth"
import { app } from '../database/firebase'
import { push, ref, set,update, onValue } from "firebase/database"
import { db } from '../database/firebase'
import React from "react"
import axios from "axios"
import Trainings from './Trainings'

const auth = getAuth(app)


export default function Room({ navigation, route }) {

    //HUONEESEEN VOI LIITTYÄ MONTA KERTAA! EN OLE JAKSANUT VIELÄ KORJATA
    //TODO: YKSI HENKILÖ VOI KUULUA KILPAILUUN VAIN KERRAN

    const { room } = route.params

    const [trainings, setTrainings] = React.useState([])
    const [theBoolean, setTheBoolean] = React.useState(false)

    React.useEffect(() => console.log(`trainings: ${trainings.length}`),[trainings])

    const userToRoom = () => {
        update(
            ref(db, `rooms/${room[0]}` ),{
                users: [auth.currentUser.uid, ...room[1].users] 
            }
        )
    }

    const getGoogleUsers = () => {
        
        let users = []

        room[1].users.forEach(element => {
            const userRef = ref(db, 'users/' + element)
            onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                users.push(data)
         })
        })

        console.log(users)
        getAllTrainings(users)
    }


    const getAllTrainings = (users) => {
        console.log('getting all trainings')
        users.forEach(user => getTrainings(user))
       
    }

    const getTrainings = (user) => {

        axios.get('https://www.strava.com/api/v3/athlete/activities', {
          headers : {
            'Authorization':`Bearer ${user.access_token}`
          }
        })
        .then(res => {
            console.log(res)
            res.data.forEach(element => {
                setTrainings(arr => [...arr, element])
            
            })
        })
        .catch(err => { 
            console.error(err)
            getAccessToken(user)})
    }


    //ACCESS TOKENI VANHENTUU JA UUDEN HANKKIMISTA EI VIELÄ TEHTY
    //TODO: TEE TÄHÄN FUNKTIOON KUTSU JOKA HAKEE REFRESH TOKENILLA UUDET
    //TOKENIT
    const getAccessToken = (user) => {
        console.log('getting new tokens')

        axios.post(`https://www.strava.com/api/v3/oauth/token?client_id=76862&client_secret=67401766aa8757e4f2c742595091a8d3014137c6&grant_type=refresh_token&refresh_token=${user.refresh_token}`)
        .then(res => {
            putTokensToUser(res.data, user)})
        .catch(err => console.error(err))
    }

    const putTokensToUser = (tokens, user) => {
        console.log('tokens to user')
        console.log(tokens)
        set(
            ref(db, 'users/' + auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                athlete_id: user.athlete_id
            }
        )
        .catch(err => Alert.alert("Jokin meni pieleen"))

    }

    React.useState(() => getGoogleUsers(),[])

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
            <Button
            color='black'
            title="see trainings"
            onPress={() => theBoolean ? setTheBoolean(false): setTheBoolean(true)}/>

            {
            theBoolean ? 
                <Trainings trainings={trainings} navigation={navigation}/>
                :
                <View>
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
            }
        </View>
        </ImageBackground>
    )
}