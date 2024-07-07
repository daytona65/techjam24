import { Stack } from 'expo-router';
import { Text, View, SafeAreaView, Dimensions, FlatList, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Matchmaker } from './Matchmaker';
import { BottomTabs } from './BottomTabs';
import { IProduct } from './exportInterface';
import { SideTabs } from './SideTabs';
import { Search } from './Search';
import { products, videos } from './exportData';


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
                <SideTabs />
            </View>
        </Pressable>
        );
    };
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchProducts = async () => {
        try {
            // const response = await fetch('http://localhost:5000/recommend?id=1'); // 10.0.2.2 for Android emulators, localhost for ios
            const response = await fetch('http://10.0.2.2:5000/recommend?id=1'); // 10.0.2.2 for Android emulators, localhost for ios
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const productsArray = await response.text();
            // console.log(productsArray);
            setProducts(JSON.parse(productsArray));
            // const productsArray = await response.json(); //json for ios
            // console.log(productsArray);
            // setProducts(productsArray);
            console.log(products);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
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
        // <TouchableOpacity onPress={() => Keyboard.dismiss()}>
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
                <Search />
                <BottomTabs />
            </View>
        // </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%"
    },
    videoContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    video: {
        width: '100%',
        height: '100%',
    },
    matchContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});
