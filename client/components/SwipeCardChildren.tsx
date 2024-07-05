import React from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { IProduct } from './Matchmaker';

export interface ISwipeCardChildren {
  item: IProduct;
  swipe: Animated.ValueXY;
  isFirst: boolean;
  renderChoice: (swipe: any) => React.JSX.Element;
}

export const SwipeCardChildren = ({
  item,
  swipe,
  isFirst,
  renderChoice,
}: ISwipeCardChildren) => {
  return (
    <Card
      profileImg={item.productImg}
      minWidth={300}
      maxHeight={600}
      minHeight={700}>
      <Card.Info style={styles.userInfo}>
        {isFirst && renderChoice(swipe)}
        <View>
          <Card.Title>
            {item.name}, {item.category}
          </Card.Title>
          <Card.Description>{item.description}</Card.Description>
        </View>
          <Text style={styles.discount}>35% Off!</Text>
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
      padding: 5,
      marginVertical: 20,
      position: 'relative',
      top: -40,
      left: -60,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 10,
      backgroundColor: '#db350f',
      fontSize: 20,

    }
});