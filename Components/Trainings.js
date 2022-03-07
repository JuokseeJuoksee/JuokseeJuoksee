import * as React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { Storage, sessionStorage } from '../Classes/Storage'
import axios from 'axios';
import Training from './Training';

export default function Trainings({navigation}) {

  const [trainings, setTrainings] = React.useState([])
  const [users, setUsers] = React.useState([{}])

  React.useEffect(() => {
    getUsers()
    getTrainings()} ,[])
  React.useEffect(() => console.log(`trainings update`),[trainings])
  React.useEffect(() => console.log('users update'),[users])

  const getTrainings = () => {

    axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers : {
        'Authorization':`Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setTrainings(res.data)
    })
    .catch(err => console.error(err))
  }

  const getUsers = () => {
    axios.get('https://www.strava.com/api/v3/athlete', {
      headers : {
        'Authorization':`Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setUsers([res.data])
    })
    .catch(err => console.error(err))
  }

  const renderItem = ({item}) => {
      let user
      users.forEach(element => {
        if (element.id == item.athlete.id) {
          user = element
        }
      })
      console.log(user)
      return <Training item={item} navigation={navigation} user={user}/>
      }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#778899' }}>
        <FlatList
          style={{width:'90%'}}
          data={trainings}
          renderItem={renderItem}
          keyExtractor={training => training.id}
        >
        </FlatList>
        <Button
        color='black'
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}/>
      </View>
    );
  }
