import React from "react";
import { Dimensions, View, StyleSheet, Image, Text, Button, ImageBackground, Pressable } from "react-native";
import { IProduct } from "./exportInterface";
import { ShopBottomTabs } from "./ShopBottomTabs";
import IconFA from 'react-native-vector-icons/FontAwesome';

export const TiktokShop = (
    { item, onClose }
) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.back}>
                <IconFA.Button
                color="black"
                backgroundColor="transparent"
                name="arrow-left"
                onPress={onClose}
                />
            </Pressable>
            <ImageBackground source={{ uri: item.img_link }} style={styles.image} />
            <Text style={styles.price}>${item.discounted_price}</Text>
            <Text style={styles.title}>{item.product_name}</Text>
            <View style={styles.ratingcontainer}>
                <IconFA.Button
                    color="#a67a0c"
                    backgroundColor="transparent"
                    name="star"
                    style={{marginTop: -7, marginRight: -8}}
                />
                <Text style={styles.rating}>{item.rating}</Text>
                <Text> / </Text>
                <Text style={styles.rating}>5.0      {item.rating_count}</Text>
                <Text> sold</Text>
            </View>
            
            <Image resizeMode="contain" source={require('../assets/tiktokshop.jpg')} style={styles.shopmenu}/>
        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-start',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        zIndex: 999,
        bottom: 0,
        backgroundColor: 'white',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
        borderBottomWidth: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 150,
        borderRadius: 4,
        elevation: 3,
        zIndex: 999,
        backgroundColor: 'black',
    },
    back: {
        flexDirection: 'row',
        left: 0,
        position: 'relative',
        marginTop: 35,
        marginBottom: -30,
        zIndex: 999999,

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    shopmenu: {
        width: 400,
        height: 400,
        marginTop: -30
    },
    title: {
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        width: "50%",
        flexWrap: 'wrap'
    },
    price: {
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        overflow: "hidden",
        flexWrap: 'wrap'
    },
    ratingcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginBottom: -20
    },
    rating: {
        fontWeight: '700',
    },
});