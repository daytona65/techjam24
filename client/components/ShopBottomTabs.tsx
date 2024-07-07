import React from "react";
import { Dimensions, View, StyleSheet, Image, Text } from "react-native";


export const ShopBottomTabs = () => {
    return (
        <View style={styles.container}>
            <Image resizeMode="contain" source={require('../assets/tiktokshop.jpg')} style={styles.icons}/>
        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'static',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        height: 200,
        bottom: 0,
        backgroundColor: 'red',
    },
    icons: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});