import React from "react";
import { Dimensions, View, StyleSheet, Image, Text, Pressable, ImageBackground } from "react-native";


export const Tutorial = (
    {handleTutorial}
) => {
    return (
        <ImageBackground 
            source={require('../assets/b1.jpg')} 
            style={styles.container}
            blurRadius={90}
        >
            <Text style={styles.header}>Introducing Matchmaker for: </Text>
            <Image resizeMode="contain" style={styles.image} source={require('../assets/shoplogo.png')} />
            <Text style={styles.text}>Swipe left to dislike, swipe right to like</Text>
            <Text style={styles.text}>If you get a match, you can get amazing discounts!</Text>
            <Pressable style={styles.button} onPress={handleTutorial}>
                <Text style={styles.yes}>Yes</Text>
            {/* <ImageBackground
                source={require('')}>
                <Text>I understand</Text>
            </ImageBackground> */}
            </Pressable>
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