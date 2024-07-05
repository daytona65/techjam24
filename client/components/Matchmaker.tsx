import React, { Fragment, useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SwipeCard } from './SwipeCard';
import Choice from './Choice';
import { UserActions } from './UserActions';
import { useProductsDiscover } from '../hooks/useProductsDiscover';
import { SwipeCardChildren } from './SwipeCardChildren';
// import { useInteractWithPeopleMutation } from '../../rtk-query';

export interface IProduct {
  id: number;
  productImg: string;
  name: string;
  description: string;
  category: string;
}

export interface IProductDiscovery {
  productsToDiscover: IProduct[];
  // refetch: () => void; Add refetch function to refresh products when it is finished
}
export const Matchmaker = ({productsToDiscover}: IProductDiscovery) => {
//   const [interact] = useInteractWithPeopleMutation({
//     fixedCacheKey: 'interactWithPeople',
//   });
  const {products, setProducts} = useProductsDiscover({productsToDiscover});

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

  const handleSwipeUserMatching = (
    swipe: Animated.ValueXY,
    prevState: IProduct[],
  ) => {
    const isLike = Number(JSON.stringify(swipe.x)) > 0;
    const userIdReceiver = prevState?.[0]?.id;

    // interact({
    //   interaction: isLike ? 'like' : 'reject',
    //   userIdReceiver,
    //   userIdTransmitter: 1,
    // });
  };

  return (
    <View style={styles.matchContainer}>
      <SwipeCard<IProduct>
        onSwipeUser={handleSwipeUserMatching}
        items={products}
        setItems={setProducts}
        renderActionBar={handleChoice => (
          <UserActions
            onLike={() => handleChoice(1)}
            onReject={() => handleChoice(-1)}
          />
        )}
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
      backgroundColor: 'red'
    }
  });