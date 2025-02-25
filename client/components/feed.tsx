import { Stack } from 'expo-router';
import { Text, View, SafeAreaView, Dimensions, FlatList, StyleSheet, Pressable, Keyboard } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Matchmaker } from './Matchmaker';
import { BottomTabs } from './BottomTabs';
import { IProduct } from './exportInterface';
import { SideTabs } from './SideTabs';
import { Search } from './Search';
import { products, videos } from './exportData';
import { shortenName } from '../hooks/useProductsDiscover';
import { LoginScreen } from './LoginScreen';

export const Feed = (
    {userId}
) => {
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
    const [products, setProducts] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
        try {
            console.log("FetchProducts");
            const response = await fetch(`http://10.0.2.2:5000/recommend?id=${userId}`); // 10.0.2.2 for Android emulators
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const productsArray = await response.text();
            setProducts(shortenName(JSON.parse(productsArray), 40));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const renderItem = ({ item, index }) => {
        if (typeof item === 'string') {
            return <Item item={item} shouldPlay={index === currentViewableItemIndex} />
        } else {
            return (
                <View style={styles.matchContainer}>
                    <Matchmaker productsDiscovery={products} userId={userId} />
                </View>
            )
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
            <View 
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => Keyboard.dismiss()}
                style={styles.container}
            >
                <FlatList
                    data={videos}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    pagingEnabled
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                />
                <Search userId={userId}/>
                <BottomTabs />
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
