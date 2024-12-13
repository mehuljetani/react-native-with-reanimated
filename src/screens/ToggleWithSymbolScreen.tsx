import React from 'react';
import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';

const SIZE = 120;
const ToggleWithSymbolScreen = () => {
  const animSymbolRef = React.useRef(new Animated.Value(0)).current;
  const opacityOpen = React.useRef(new Animated.Value(1)).current;
  const opacityClose = React.useRef(new Animated.Value(0)).current;

  const [togglerSymbolActive, setTogglerSymbolActive] = React.useState(false);

  const animateSymbol = () => setTogglerSymbolActive(cur => !cur);

  React.useEffect(() => {
    Animated.timing(animSymbolRef, {
      toValue: togglerSymbolActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityOpen, {
      toValue: togglerSymbolActive ? 0 : 1,
      duration: togglerSymbolActive ? 100 : 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityClose, {
      toValue: togglerSymbolActive ? 1 : 0,
      duration: togglerSymbolActive ? 200 : 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerSymbolActive]);

  return (
    <View style={styles.bg}>
      <Pressable onPress={animateSymbol}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: togglerSymbolActive ? 'gray' : '#FF5722',
            },
          ]}>
          <Animated.View
            style={[styles.dot, {transform: [{translateX: animSymbolRef}]}]}
          />
          <Animated.View
            style={[
              styles.symbolOpen,
              {opacity: opacityOpen, transform: [{translateX: animSymbolRef}]},
            ]}
          />
          <Animated.View
            style={[
              styles.symbolClose,
              {opacity: opacityClose, transform: [{translateX: animSymbolRef}]},
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ToggleWithSymbolScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  container: {
    width: SIZE,
    height: SIZE / 3,
    borderRadius: SIZE / 4,
  },
  dot: {
    left: 0,
    width: SIZE / 2,
    height: SIZE / 2,
    top: -(SIZE / 12),
    position: 'absolute',
    borderRadius: SIZE / 2,
    backgroundColor: 'white',
  },
  symbolOpen: {
    width: SIZE / 4,
    height: SIZE / 4,
    position: 'absolute',
    borderColor: 'black',
    borderWidth: SIZE / 20,
    borderRadius: SIZE / 4,
    left: (SIZE - SIZE / 2) / 4,
    top: (SIZE / 3 - SIZE / 4) / 2,
  },
  symbolClose: {
    left: SIZE / 5,
    width: SIZE / 20,
    height: SIZE / 4,
    borderColor: 'black',
    position: 'absolute',
    borderWidth: SIZE / 20,
    borderRadius: SIZE / 4,
    top: (SIZE / 3 - SIZE / 4) / 2,
  },
});
