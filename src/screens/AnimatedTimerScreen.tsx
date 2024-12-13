import * as React from 'react';
import {
  View,
  Easing,
  Animated,
  Vibration,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const colors = {
  red: '#E74C3C',
  text: '#ffffff',
  black: '#000000',
};

const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;
const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));

export default function AnimatedTimerScreen() {
  const ref = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [duration, setDuration] = React.useState(timers[0]);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const timerValue = React.useRef(new Animated.Value(height)).current;
  const textAnimatedValue = React.useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    const listener = textAnimatedValue.addListener(({value}) => {
      ref?.current?.setNativeProps({
        text: value < 0.1 ? '0' : Math.ceil(value).toString(),
      });
    });
    return () => {
      textAnimatedValue.removeListener(listener);
    };
  }, []);

  const animation = React.useCallback(() => {
    textAnimatedValue.setValue(duration);
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(timerValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.parallel([
        Animated.timing(timerValue, {
          toValue: height,
          easing: Easing.linear,
          useNativeDriver: true,
          duration: duration * 1000,
        }),
        Animated.timing(textAnimatedValue, {
          toValue: 0,
          easing: Easing.linear,
          useNativeDriver: true,
          duration: duration * 1000,
        }),
      ]),
      Animated.delay(100),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      timerValue.setValue(height);
      textAnimatedValue.setValue(duration);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const buttonTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedBackground,
          {
            transform: [
              {
                translateY: timerValue,
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.animatedButton,
          {
            transform: [
              {
                translateY: buttonTranslateY,
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.timerContainer}>
        <Animated.View style={[styles.textContainer, {opacity: animatedValue}]}>
          <TextInput
            ref={ref}
            style={styles.text}
            defaultValue={duration.toString()}
          />
        </Animated.View>
        <Animated.FlatList
          horizontal
          data={timers}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={ITEM_SIZE}
          style={{flexGrow: 0, opacity}}
          keyExtractor={item => item.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
          onMomentumScrollEnd={e => {
            setDuration(
              timers[Math.round(e.nativeEvent.contentOffset.x / ITEM_SIZE)],
            );
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const scale = scrollX.interpolate({
              inputRange,
              extrapolate: 'clamp',
              outputRange: [0.7, 1, 0.7],
            });
            const opacity = scrollX.interpolate({
              inputRange,
              extrapolate: 'clamp',
              outputRange: [0.3, 1, 0.3],
            });
            return (
              <View style={{width: ITEM_SIZE}}>
                <Animated.Text
                  style={[
                    styles.text,
                    {
                      opacity,
                      textAlign: 'center',
                      transform: [{perspective: ITEM_SIZE}, {scale}],
                    },
                  ]}>
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  animatedBackground: {
    width,
    height,
    backgroundColor: colors.red,
    ...StyleSheet.absoluteFillObject,
  },
  animatedButton: {
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...StyleSheet.absoluteFillObject,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  timerContainer: {
    flex: 1,
    left: 0,
    right: 0,
    top: height / 3,
    position: 'absolute',
  },
  textContainer: {
    width: ITEM_SIZE,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '900',
    fontFamily: 'Menlo',
    color: colors.text,
    fontSize: ITEM_SIZE * 0.8,
  },
});
