import {
  Text,
  View,
  Easing,
  Animated,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';

const SIZE = 120;

const ToggleWithLabelScreen = () => {
  const animRef = React.useRef(new Animated.Value(0)).current;
  const [togglerActive, setTogglerActive] = React.useState(false);

  const animate = () => setTogglerActive(cur => !cur);

  React.useEffect(() => {
    Animated.timing(animRef, {
      toValue: togglerActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerActive]);

  return (
    <View style={styles.bg}>
      <Pressable onPress={animate}>
        <View
          style={[
            styles.container,
            {backgroundColor: !togglerActive ? 'white' : 'gray'},
          ]}>
          <Animated.View
            style={[
              styles.background,
              {
                transform: [{translateX: animRef}],
                backgroundColor: !togglerActive ? 'black' : 'white',
              },
            ]}
          />
          <Text
            style={[
              styles.label,
              {
                right: !togglerActive ? SIZE / 8 : SIZE / 2 + 4,
                color: !togglerActive ? 'black' : 'white',
              },
            ]}>{`${togglerActive ? 'ON' : 'OFF'}`}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ToggleWithLabelScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  container: {
    width: SIZE,
    borderWidth: 2,
    height: SIZE / 2,
    borderColor: 'black',
    borderRadius: SIZE / 4,
    justifyContent: 'center',
    paddingHorizontal: SIZE / 24,
  },
  background: {
    width: SIZE / 2 - 10,
    height: SIZE / 2 - 10,
    borderRadius: (SIZE / 2 - 10) / 2,
  },
  label: {
    fontSize: SIZE / 7,
    position: 'absolute',
  },
});
