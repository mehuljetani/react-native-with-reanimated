import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';

const DotLoaderScreen = () => {
  const [size, setSize] = React.useState(30);
  const opacityRef1 = React.useRef(new Animated.Value(0.3)).current;
  const opacityRef2 = React.useRef(new Animated.Value(0.3)).current;
  const opacityRef3 = React.useRef(new Animated.Value(0.3)).current;
  const opacityRef4 = React.useRef(new Animated.Value(0.3)).current;

  const scaleRef1 = React.useRef(new Animated.Value(1)).current;
  const scaleRef2 = React.useRef(new Animated.Value(1)).current;
  const scaleRef3 = React.useRef(new Animated.Value(1)).current;
  const scaleRef4 = React.useRef(new Animated.Value(1)).current;

  const translateYRef1 = React.useRef(new Animated.Value(0)).current;
  const translateYRef2 = React.useRef(new Animated.Value(0)).current;
  const translateYRef3 = React.useRef(new Animated.Value(0)).current;
  const translateYRef4 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef1, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef1, {
              toValue: -(+size / 1.5),
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef1, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef1, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef2, {
              toValue: 1,
              duration: 300,
              delay: 200,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef2, {
              toValue: -(+size / 1.5),
              duration: 300,
              delay: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef2, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef2, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef3, {
              toValue: 1,
              duration: 300,
              delay: 400,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef3, {
              toValue: -(+size / 1.5),
              duration: 300,
              delay: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef3, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef3, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef4, {
              toValue: 1,
              duration: 300,
              delay: 600,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef4, {
              toValue: -(+size / 1.5),
              duration: 300,
              delay: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef4, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef4, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              opacity: opacityRef1,
              borderRadius: (+size || 1) / 2,
              transform: [
                {
                  scale: scaleRef1,
                },
                {
                  translateY: translateYRef1,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              opacity: opacityRef2,
              transform: [
                {
                  scale: scaleRef2,
                },
                {
                  translateY: translateYRef2,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              opacity: opacityRef3,
              borderRadius: (+size || 1) / 2,
              transform: [
                {
                  scale: scaleRef3,
                },
                {
                  translateY: translateYRef3,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              marginRight: 0,
              width: size || 1,
              height: size || 1,
              opacity: opacityRef4,
              borderRadius: (+size || 1) / 2,
              transform: [
                {
                  scale: scaleRef4,
                },
                {
                  translateY: translateYRef4,
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default DotLoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  dot: {
    marginRight: 8,
    backgroundColor: '#fff',
  },
});
