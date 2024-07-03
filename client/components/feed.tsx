import * as React from 'react';
import { Stack } from 'expo-router';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Video } from 'expo-av';


const post = {
    id: '1',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4'
}
export const Feed = () => {
    return (
        <SafeAreaView>
            <Video 
                style ={StyleSheet.absoluteFill} 
                source={{ uri: post.video}} />
            <Text>Video Feed</Text>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    video: {
        width: '100%',
        height: '100%'
    }
});
