import React from "react";
import { Dimensions, View, StyleSheet, Image, Text } from "react-native";


export const BottomTabs = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/home.png')} style={styles.icons}/>
            <Image source={require('../assets/shop.png')} style={styles.icons}/>
            <Image source={require('../assets/create.png')} style={styles.icons}/>
            <Image source={require('../assets/inbox.png')} style={styles.icons}/>
            <Image source={require('../assets/profile.png')} style={[styles.icons, {width: 55, height: 60}]}/>
        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        height: 80,
        bottom: 0,
        backgroundColor: 'black',
    },
    icons: {
        width: 60,
        height: 60,
    }
});