import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Video } from 'expo-av';

const post = {
    id: '1',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4'
}
const Feed = () => {
    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{ headerShown: false }}
            />
            <Video source={{ uri: post.video}} />
            <Text>Video Feed</Text>
        </SafeAreaView>
    )
}

export default Feed;