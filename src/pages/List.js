import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, AsyncStorage, Image, ScrollView } from 'react-native'

import SpotList from '../components/SpotList'
import logo from '../assets/logo.png'
import styles from './styles/list'

export default function List (){
    const [ techs, setTechs ] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.56.1:3333', {
                query: { user_id }
            })
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' } `)
            })
        })

    }, [])

    useEffect(()=>{

    AsyncStorage.getItem('techs').then(storageTechs => {
        const techsArray = storageTechs.split(',').map(tech => tech.trim()) //vai cortar e espaços a virgula e transformar em array
    
        setTechs(techsArray)
    
    })


    }, [])
    
    return <SafeAreaView style={styles.container}>
        
        <Image source={logo} style={styles.logo}/>

        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/> )}
        </ScrollView>
        
        </SafeAreaView>
}