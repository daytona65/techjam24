import React from "react";
import { Dimensions, View, StyleSheet, Image, Text } from "react-native";


export const BottomTabs = () => {
    return (
        <View style={styles.container}>
            <Text>Testing</Text>
            <Image source={require('../assets/home.png')} />
            <Image source={require('../assets/shop.png')} />
            <Image source={require('../assets/create.png')} />
            <Image source={require('../assets/inbox.png')} />
            <Image source={require('../assets/profile.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'static',
        width: Dimensions.get('window').width,
        height: 1000,
        zIndex: 999,
        backgroundColor: 'black',
    },
});