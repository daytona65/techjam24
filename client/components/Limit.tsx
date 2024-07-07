import React from "react";
import { Dimensions, View, StyleSheet, Image, Text, Pressable, ImageBackground } from "react-native";


export const Limit = () => {
    return (
        <ImageBackground 
            source={require('../assets/b1.jpg')} 
            style={styles.container}
            blurRadius={90}
        >
            <Text style={styles.header}>You have used up all your Likes for today. </Text>
            <Image resizeMode="contain" style={styles.image} source={require('../assets/shoplogo.png')} />
            <Text style={styles.text}>Come back tomorrow for more Likes!</Text>
        </ ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        bottom: 50,
        backgroundColor: 'black',
    },
    header: {
        textAlign: 'center',
        width: 200,
        color: 'white',
        fontSize: 25,
        fontWeight: '500',
    },
    text: {
        textAlign: 'center',
        width: 200,
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 20
    },
    yes: {
        textAlign: 'center',
        width: 200,
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 300,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    image: {
        width: 250,
        height: 100,
    },
});