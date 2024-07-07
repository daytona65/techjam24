import React from "react";
import { Dimensions, View, StyleSheet, Image, Text } from "react-native";


export const SideTabs = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/user.png')} style={[styles.icons, {top: 20, left: -22, width: 80, height: 80}]}/>
            <Image source={require('../assets/heart.png')} style={styles.icons}/>
            <Image source={require('../assets/chat.png')} style={styles.icons}/>
            <Image source={require('../assets/save.png')} style={styles.icons}/>
            <Image source={require('../assets/share.png')} style={styles.icons}/>
            <Image source={require('../assets/tiktok.png')} style={[styles.icons, {left: -5, width: 50, height: 50}]}/>
        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        height: 430,
        bottom: '10%',
        left: '90%',
        zIndex: 0,
        backgroundColor: 'transparent',
    },
    icons: {
        width: 35,
        height: 35,
        margin: -10,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
    }
});