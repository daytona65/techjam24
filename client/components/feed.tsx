import { Stack } from 'expo-router';
import { Text, View, SafeAreaView, Dimensions, FlatList, StyleSheet, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Matchmaker } from './Matchmaker';

const videos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    {type: 'card'},
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

export const products = [
    {id: 0, productImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", name: "Eggs", description: "High quality eggs sourced only from organic local farms!", category: "Food"},
    {id: 1, productImg: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", name: "Macbook", description: "The latest offering from Apple this year!", category: "Electronics" },
    {id: 2, productImg: "https://plus.unsplash.com/premium_photo-1675431443027-ad1f46c93c8d", name: "Creams", description: "Salicylic acid based cream for pimples.", category: "Beauty" },
    {id: 3, productImg: "https://images.unsplash.com/photo-1581776171075-e1206a108498", name: "Blood Orange", description: "Wholesale prices fresh from local farms.", category: "Food" }
]

export const refetch = () => {

}

export const Feed = () => {
    const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
        setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
        }
    }
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
    const Item = ({ item, shouldPlay }: { item: string; shouldPlay: boolean; }) => {
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
    const renderItem = ({ item, index }) => {
        if (typeof item === 'string') {
            return <Item item={item} shouldPlay={index === currentViewableItemIndex} />
        } else {
            return (
                <View style={styles.matchContainer}>
                    <Matchmaker productsToDiscover={products} />
                </View>
                
            )
        }
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={item => item}
                pagingEnabled
                horizontal={false}
                showsVerticalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+48
    },
    video: {
        width: '100%',
        height: '100%',
    },
    matchContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+50
    }
});
