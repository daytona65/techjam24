import React, { useRef, useState } from "react";
import { Dimensions, View, StyleSheet, Image, Text, TextInput, Alert } from "react-native";


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
    }

    const handleLogin = () => {
        if (username && password) {
            console.log("Login from LoginScreen");
            loginFunction(username);
          } else {
            Alert.alert('Error', 'Please fill in both username and password');
          }
    }

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
        // fontFamily: 'Inter'
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

