import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';

export type TCardElement = {
  children: React.ReactNode;
  style?: Record<string, any>;
};

export type TDescription = TCardElement;
export const Description = ({children}: TDescription) => {
  return <Text style={[styles.description]}>{children}</Text>;
};

export type TTitle = TCardElement;
export const Title = ({children}: TTitle) => {
  return <Text style={[styles.title]}>{children}</Text>;
};

export type TInfo = TCardElement;
export const Info = ({children, style}: TInfo) => {
  return <View style={[styles.info, style]}>{children}</View>;
};

export type TCard = TCardElement & {
  profileImg?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
};
export const Card = ({
  children,
  profileImg,
  minHeight = 100,
  maxHeight,
  minWidth,
}: TCard) => {
  const cardStyles = {
    minHeight,
    maxHeight,
    minWidth,
  };
  return (
    <View style={[styles.card, cardStyles]}>
      <ImageBackground
        style={[styles.cover]}
        source={require('../assets/b1.jpg')}
        >
        <ImageBackground
          style={[styles.cover]}
          source={{
            uri: profileImg,
          }}
          resizeMode="contain"
        >
          <LinearGradient
            colors={['transparent',   '#050505']}
            style={styles.gradient}
          >
            <View style={[styles.coverContainer]}>
              {children}
            </View>
          </LinearGradient>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      flex: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      overflow: 'hidden',
      // backgroundColor: '#c9c29b',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      width: Dimensions.get('window').width
    },
    cover: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
    },
    coverContainer: {
      paddingTop: 40, // Adjust gradient
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: 'transparent'
    },
    info: {},
    title: {
      color: 'white',
      fontSize: 25,
      fontWeight: '700',
    },
    description: {
      color: 'white',
      fontSize: 18,
      fontWeight: '400',
      overflow: "hidden",
      flexWrap: 'wrap'
    },
    gradient: {
      borderRadius: 10,
      paddingVertical: 50,
      paddingHorizontal: 12,
    },
  });

Card.Title = Title;
Card.Description = Description;
Card.Info = Info;

