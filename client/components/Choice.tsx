import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';

const COLORS = {
  like: '#00eda6',
  nope: '#ff006f',
};

export interface IChoise {
  type: 'like' | 'nope';
}

const Choice: FC<IChoise> = ({type}) => {
  const color = COLORS[type];

  return (
    <View
      style={[
        {
          borderColor: color,
        },
        styles.wrapper,
      ]}>
      <Text
        style={[
          {
            color: color,
          },
          styles.container,
        ]}>
        {type}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
      borderWidth: 7,
      paddingHorizontal: 15,
      borderRadius: 15,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    container: {
      fontSize: 48,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 4,
    },
  });

export default Choice;