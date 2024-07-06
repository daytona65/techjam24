import React from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ISwipeCardChildren } from './exportInterface';

export const SwipeCardChildren = ({
  item,
  swipe,
  isFirst,
  renderChoice,
}: ISwipeCardChildren) => {
  return (
    <Card
      profileImg={item.product_img}
      minWidth={300}
      maxHeight={600}
      minHeight={700}>
      <Card.Info style={styles.userInfo}>
        {isFirst && renderChoice(swipe)}
        <View>
          <Card.Title>
            {item.product_name}
          </Card.Title>
          <Card.Description>{item.description}</Card.Description>
        </View>
          <Text style={styles.discount}>{item.discount_percentage}OFF!</Text>
      </Card.Info>
    </Card>
  );
};

const styles = StyleSheet.create({
    userInfo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    discount: {
      position: 'relative',
      width: 500,
      top: -400,
      left: -80,
      transform: [{rotate: '-30deg'}],
      flexWrap: 'wrap',
      fontSize: 60,
      fontWeight: '800'
    }
});