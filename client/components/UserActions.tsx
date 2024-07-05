import React, { FC } from 'react';
import { Image, TouchableOpacity, GestureResponderEvent, View, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
// import { GestureResponderEvent  } from 'react-native-vector-icons';
export interface IUserActions {
  onReject: () => void;
  onLike: () => void;
}

export const UserActions: FC<IUserActions> = ({onReject, onLike}) => {
  const handlePressReject = (event: GestureResponderEvent) => {
    onReject();
    // return event;
  };
  const handlePresslike = (event: GestureResponderEvent) => {
    onLike();
    // return event;
  };
  const handlePressTiktokShop = (event: GestureResponderEvent) => {
    // return event;
  };

  return (
    <View style={[styles.wrapper]}>
      <View
        style={[
          styles.iconWrapper,
          styles.closeWrapper,
        ]}>
        <IconFA.Button
          style={styles.closeIcon}
          iconStyle={styles.closeIconContent}
          backgroundColor="transparent"
          name="close"
          onPress={handlePressReject}
        />
      </View>

      <View
        style={[
          styles.iconWrapper,
          styles.likeWrapper,
        ]}>
        <IconFA.Button
          style={styles.likeIcon}
          iconStyle={styles.likeIconContent}
          color="black"
          backgroundColor="transparent"
          name="check"
          onPress={handlePresslike}
        />
      </View>
      {/* <View
        style={[
          styles.iconWrapper,
          styles.chatWrapper,
        ]}
      >
        <TouchableOpacity onPress={handlePressTiktokShop}>
          <Image 
            style={styles.tiktokshopIcon}
            source={require('../assets/splash.png')}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
      top: "170%", // Adjust position of action buttons
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    iconWrapper: {
      width: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 40,
      overflow: 'hidden',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 2,
      padding: 5,
    },
    closeIcon: {
      width: 45,
    },
    closeIconContent: {
      width: 30,
      fontSize: 30,
      color: '#F31559',
      marginLeft: 3,
    },
    likeIcon: {
      width: 55,
    },
    likeIconContent: {
      width: 40,
      fontSize: 40,
      color: 'white',
    },
    tiktokshopIcon: {
      width: 45,
    },
    closeWrapper: {
      backgroundColor: 'white',
    },
    chatWrapper: {
      backgroundColor: 'white',
    },
    likeWrapper: {
      backgroundColor: '#9525ff',
      padding: 10,
    },
  });