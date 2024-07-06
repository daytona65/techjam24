import { Stack } from 'expo-router';
import { Text, View, SafeAreaView, Dimensions, FlatList, StyleSheet, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Matchmaker } from './Matchmaker';
import { products, videos } from './exportData';
import { IProduct } from './exportInterface';
import axios from 'axios';


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
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true);
        console.log('fetching')
        fetch(`http://127.0.0.1:5000/products`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.text())
        .then((data) => {
            // setProducts(data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
        setLoading(false);
    }, []);

    const renderItem = ({ item, index }) => {
        if (typeof item === 'string') {
            return <Item item={item} shouldPlay={index === currentViewableItemIndex} />
        } else {
            return (
                <View style={styles.matchContainer}>
                    <Matchmaker productsDiscovery={products} />
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
