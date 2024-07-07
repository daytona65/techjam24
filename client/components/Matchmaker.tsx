import React, { Fragment, useCallback, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SwipeCard } from './SwipeCard';
import Choice from './Choice';
import { UserActions } from './UserActions';
import { useProductsDiscover } from '../hooks/useProductsDiscover';
import { SwipeCardChildren } from './SwipeCardChildren';
import { IProductDiscovery, IProduct } from './exportInterface';
// import { useInteractWithPeopleMutation } from '../../rtk-query';

export const Matchmaker = ({productsDiscovery}: IProductDiscovery) => {
//   const [interact] = useInteractWithPeopleMutation({
//     fixedCacheKey: 'interactWithPeople',
//   });
  const {products, setProducts} = useProductsDiscover({productsDiscovery});

  const likeOpacity = (swipe: any) =>
    swipe.x.interpolate({
      inputRange: [25, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

  const nopeOpacity = (swipe: any) =>
    swipe.x.interpolate({
      inputRange: [-100, -25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const renderChoice = useCallback(
    (swipe: any) => (
      <Fragment>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            {opacity: likeOpacity(swipe)},
          ]}>
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            {opacity: nopeOpacity(swipe)},
          ]}>
          <Choice type="nope" />
        </Animated.View>
      </Fragment>
    ),
    [],
  );

  const handleSwipeUserMatching = async (
    swipe: Animated.ValueXY,
    prevState: IProduct[],
  ) => {
    // console.log(swipe.x);
    const isLike = Number(JSON.stringify(swipe.x)) > 0;
    const userIdReceiver = prevState?.[0]?.product_id;
    // console.log(isLike ? 'like' : 'dislike');
    const interactData = {
      sentiment: isLike ? 'like' : 'dislike',
      product_id: userIdReceiver
    }
    try {
      const response = await fetch('http://10.0.2.2:5000/updatepreference?id=2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interactData)
      });
      if (!response.ok) {
        throw new Error('POST response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <View style={styles.matchContainer}>
      <SwipeCard<IProduct>
        onSwipeUser={handleSwipeUserMatching}
        items={products}
        setItems={setProducts}
      >
        {(item, swipe, isFirst) => (
          <SwipeCardChildren
            item={item}
            swipe={swipe}
            isFirst={isFirst}
            renderChoice={renderChoice}
          />
        )}
      </SwipeCard>
    </View>
    
  );
};

const styles = StyleSheet.create({
    wrapper: {},
    choiceContainer: {
      position: 'absolute',
      top: -100,
    },
    likeContainer: {
      left: 0,
      transform: [{rotate: '-30deg'}],
    },
    nopeContainer: {
      right: 0,
      transform: [{rotate: '30deg'}],
    },
    matchContainer: {
      
    }
  });