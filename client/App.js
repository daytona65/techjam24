import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Tabs } from './tabs';
import { Feed } from './components/Feed';
import { products } from './components/exportData';
import { Matchmaker } from './components/Matchmaker';


export default function App() {
  return (
    <Feed />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: "5px solid white"
  },
});
