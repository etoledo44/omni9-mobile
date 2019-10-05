import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

//flatlist componte usado para cricao de lista

import api from '../services/api'

function SpotList({tech, navigation}){
    const [ spots, setSpots ] = useState([])

    useEffect(()=>{
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: {tech}
            })
            setSpots(response.data)
        }

        loadSpots()
    }, [])

    function handleNavigate( id ){
        navigation.navigate('Book', { id }) //mandando id por parametro para outra tela
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
        
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item })=>(
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : `Gratís`}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            
            />
        
        </View>

    )
    
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,


    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold:{
        fontWeight:'bold'
    },
    FlatList:{
        paddingHorizontal: 20
    },
    listItem:{
        marginRight: 15
    },
    thumbnail:{ //sempre que a imagem vir em forma de url é recomendado adicionar tamanho e altura
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }

})

export default withNavigation(SpotList)  /* tirar o export default da funcao e passar pra cá 
usando o componente withNavigation, e passando o navigation por parametro na funcao */ 