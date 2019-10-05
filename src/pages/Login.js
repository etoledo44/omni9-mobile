import React, { useState, useEffect } from 'react'
import { View, AsyncStorage ,KeyboardAvoidingView, Platform, Text, TextInput, Image, TouchableOpacity } from 'react-native'
//keyboardAvoidView joga o conteudo aplicacao para cima para o teclado nao atrapalhar a visualização
//plataform, vai verificar em qual plataforma esta sendo executada a aplicacao 
//asyncStorage armazena alguma informacao no banco de dados do celular para ser usado depois
import api from '../services/api'

import logo from '../assets/logo.png'
import styles from './styles/login'

export default function Login ({ navigation }){
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    //uma verificao para quando a tela for atualizada ela nao voltar para o login
    //pois esta pegando o usuario do localstorage como referencia
    useEffect(()=> {
        AsyncStorage.getItem('user').then(user => {
            if (user){
                navigation.navigate('List')
            }
        })

    }, [])

    async function handleSubmit(){
        //email , techs
        //chamada da api
    const response = await api.post('/sessions', {
        email
    })

    const { _id } = response.data

    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('techs', techs)

    navigation.navigate('List')
    }

    return ( 
        <KeyboardAvoidingView enabled={Platform.OS ? 'ios' : 'android' } behavior='padding' style={styles.container}> 
            <Image source={logo}/>  

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Seu e-mail'
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Tecnologias de interesse'
                    placeholderTextColor='#999'
                    autoCapitalize='words' //cada palavra fica em caixa alta
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontre seus spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}