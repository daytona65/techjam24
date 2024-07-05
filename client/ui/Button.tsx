import React, {FC} from 'react';
import { StyleSheet, GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export interface IButton {
  styles?: Record<string, any>;
  maxWidth?: number;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  isDisable?: boolean;
}
export const Button: FC<IButton> = ({
  styles,
  maxWidth,
  text,
  onPress,
  isDisable = false,
}) => {
  const buttonWrapper = {
    maxWidth,
    ...styles,
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} disabled={isDisable}>
        <Text style={[styles.content]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    wrapper: {
      elevation: 8,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    content: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });