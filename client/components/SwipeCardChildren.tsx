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
      minHeight={750}>
      <Card.Info style={styles.productInfo}>
        {isFirst && renderChoice(swipe)}
        <View>
          <Card.Title>
            {item.product_name}
          </Card.Title>
          <Card.Description>{item.parent_category}</Card.Description>
        </View>
          <Text style={styles.discount}>{item.discount_percentage}% OFF!</Text>
      </Card.Info>
    </Card>
  );
};

const styles = StyleSheet.create({
    productInfo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 50
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