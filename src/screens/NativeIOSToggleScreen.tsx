import React from 'react';
import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';

const SIZE = 120;

const NativeIOSToggleScreen = () => {
  const [togglerIOSActive, setTogglerIOSActive] = React.useState(false);

  const animateIOS = () => setTogglerIOSActive(cur => !cur);

  const animIOSRef = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animIOSRef, {
      toValue: togglerIOSActive ? SIZE / 2 - 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerIOSActive]);

  return (
    <View style={styles.bg}>
      <Pressable onPress={animateIOS}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: !togglerIOSActive ? '#FF5722' : '#2979FF',
            },
          ]}>
          <Animated.View
            style={[styles.dot, {transform: [{translateX: animIOSRef}]}]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default NativeIOSToggleScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  container: {
    width: SIZE,
    height: SIZE / 2,
    borderRadius: SIZE / 4,
    justifyContent: 'center',
    paddingHorizontal: SIZE / 30,
  },
  dot: {
    width: SIZE / 2 - 4,
    height: SIZE / 2 - 4,
    backgroundColor: 'white',
    borderRadius: (SIZE / 2 - 4) / 2,
  },
});
