import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Feed } from './components/Feed';
import { products } from './components/exportData';
import { Matchmaker } from './components/Matchmaker';
import { LoginScreen } from './components/LoginScreen';


export default function App() {
  const [loginScreen, setLoginScreen] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const handleLogin = (userId: string) => {
    console.log("Login at App.tsx");
    setUserId(userId);
    setLoginScreen(false);
    
}

  if (loginScreen) {
    return <LoginScreen loginFunction={handleLogin} />
  }
  return <Feed userId={userId}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
