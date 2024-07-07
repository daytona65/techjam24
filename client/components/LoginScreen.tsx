import React, { useRef, useState } from "react";
import { Dimensions, View, StyleSheet, Image, Text, TextInput, Alert } from "react-native";
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  } from '@expo-google-fonts/poppins';

export const LoginScreen = (
    {loginFunction}
) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef(null);

    const handleToPassword = async () => {
        if (passwordRef.current) {
            passwordRef.current.focus();
          }
    };

    const handleLogin = () => {
        if (username && password) {
            console.log("Login from LoginScreen");
            loginFunction(username);
          } else {
            Alert.alert('Error', 'Please fill in both username and password');
          }
    };
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
  });
    return (
        <View style={styles.container}>
            <View style={styles.inputcontainer}>
                <Text style={styles.header}>Log in to TikTok</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username or email"
                    onChangeText={setUsername}
                    value={username}
                    onSubmitEditing={handleToPassword}
                    returnKeyType="search"
                />
                <TextInput
                    ref={passwordRef}
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    onSubmitEditing={handleLogin}
                    returnKeyType="search"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        alignItems: 'flex-start',
        paddingLeft: 40,
        justifyContent: 'center', // Vertical
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    inputcontainer: {
        alignItems: 'flex-start',
        // fontFamily: 'Poppins_900Black'
    },
    header: {
        color: 'black',
        fontSize: 25,
        fontWeight: '700',
        paddingBottom: 60,
    },
    input: {
        textAlign: 'left',
        borderBottomWidth: 1,
        width: Dimensions.get('window').width*0.8,
        borderBottomColor: '#a1a1a1',
        opacity: 0.8,
        paddingLeft: -10,
        padding: 10,
    }
})

