import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { SwipeCard } from './SwipeCard';
import Choice from './Choice';
import { UserActions } from './UserActions';
import { useProductsDiscover } from '../hooks/useProductsDiscover';
import { SwipeCardChildren } from './SwipeCardChildren';
import { IProductDiscovery, IProduct } from './exportInterface';
import { Tutorial } from './Tutorial';
import { Match } from './Match';
import { TiktokShop } from './TiktokShop';
import { Limit } from './Limit';

export const Matchmaker = ({productsDiscovery, userId}: IProductDiscovery) => {
  const {products, setProducts} = useProductsDiscover({productsDiscovery, userId});
  const [tutorial, setTutorial] = useState(true)
  const [count, setCount] = useState(2);
  const [limit, setLimit] = useState(false);
  const [match, setMatch] = useState(false);
  const [matchToShop, setMatchToShop] = useState(false);
  const [previousProduct, setPreviousProduct] = useState(products[0]);

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
    const isLike = Number(JSON.stringify(swipe.x)) > 0;
    const userIdReceiver = prevState?.[0]?.product_id;
    setPreviousProduct(prevState?.[0]);
    if (isLike) {
      handleLike();
    }
    const interactData = {
      sentiment: isLike ? 'like' : 'dislike',
      product_id: userIdReceiver
    }
    try {
      const response = await fetch(`http://10.0.2.2:5000/updatepreference?id=${userId}`, {
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

  const handleMatch = () => {
    setMatch(false);
    setMatchToShop(true);
  }

  const handleLike = () => {
    const random = Math.random() < 0.2 // Probability that you get a match between 0 and 1 inclusive
    setCount(count - 1);
    console.log(count);
    if (count < 0) {
      setLimit(true);
    } else if (random) {
      setMatch(true);
    }
  }
  const handleTutorial = () => {
    setTutorial(false);
  };

  const closeShop = () => {
    setMatchToShop(false);
  }

  if (tutorial) {
    return <Tutorial handleTutorial={handleTutorial}/>
  }

  if (match) {
    return <Match handleMatch={handleMatch} item={previousProduct} />
  }

  if (matchToShop) {
    return <TiktokShop item={previousProduct} onClose={closeShop} />
  }

  if (limit) {
    return <Limit />
  }

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