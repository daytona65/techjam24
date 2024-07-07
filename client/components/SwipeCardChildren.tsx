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
      profileImg={item.img_link}
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
          <Text style={styles.discount}>{item.discount_percentage}% OFF!</Text>
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
      backgroundColor: 'yellow',
      textAlignVertical: 'center',
      textAlign: 'center',
      borderWidth: 5,
      borderRadius: 50,
      width: 100,
      top: -300,
      right: 100,
      transform: [{rotate: '-20deg'}],
      flexWrap: 'wrap',
      fontSize: 30,
      fontWeight: '800'
    }
});