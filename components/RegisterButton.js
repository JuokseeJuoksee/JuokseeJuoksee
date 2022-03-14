import { Button, Alert } from "react-native";
import { app } from '../database/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../database/firebase'
import { push, ref } from "firebase/database";

const auth = getAuth(app)

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
        
        push(
            ref(db, 'users'), {
                userId: auth.currentUser.uid,
                photoUrl: auth.currentUser.photoURL
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