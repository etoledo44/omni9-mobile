import React, { useState } from 'react'
import { View, TextInput, Alert, TouchableOpacity, Text, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native'

import api from '../services/api'
import styles from './styles/book'

export default function Book ( { navigation }){
    const id = navigation.getParam('id') //pegando o paramentro que veio da funcao ao clicar no botao 
    const [date, setDate] = useState('')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')

        await api.post(`/spots/${id}/booking`, {
            date
        }, {
            headers: {user_id} //como nas rotas do insomnia 
        })
        Alert.alert('Solicitação de reserva enviada!')
        navigation.navigate('List')
    }
    
    function handleCancel(){
        navigation.navigate('List')

    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE*</Text>
            <TextInput 
            style={styles.input}
            dataDetectorTypes='calendarEvent'
            placeholder='Que data você quer reservar?'
            placeholderTextColor= '#999'
            autoCapitalize='words'
            autoCorrect={false}
            value={date}
            onChangeText={setDate}
            
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

