import { Stack } from 'expo-router';
import { View, SafeAreaView, Dimensions, FlatList, StyleSheet, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';

const videos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

const Feed = () => {
    const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
        setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
        }
    }
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
    const Item = ({ item, shouldPlay }: {shouldPlay: boolean; item: string}) => {
        const video = React.useRef<Video | null>(null);
        const [status, setStatus] = useState<any>(null);
    
        useEffect(() => {
            if (!video.current) return;
        
            if (shouldPlay) {
                video.current.playAsync()
            } else {
                video.current.pauseAsync()
                video.current.setPositionAsync(0)
            }
        }, [shouldPlay])
    
        return (
        <Pressable onPress={() => status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync()}>
            <View style={styles.videoContainer}>
            <Video 
                ref={video}
                source={{ uri: item }}
                style={styles.video}
                isLooping
                resizeMode={ResizeMode.COVER}
                useNativeControls={false}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
        </Pressable>
        );
    };
    return (
        <View style={styles.container}>
        <FlatList
        data={videos}
        renderItem={({ item, index }) => (
            <Item item={item} shouldPlay={index === currentViewableItemIndex} />
        )}
        keyExtractor={item => item}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
        </View>
    );
}

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
