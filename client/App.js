import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Tabs } from './tabs';
import { Feed, products } from './components/Feed';
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
