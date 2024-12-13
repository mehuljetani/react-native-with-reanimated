import React from 'react';
import {
  View,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import Animated, {
  withTiming,
  withRepeat,
  interpolate,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

type TAnimatedText = {
  index: number;
  char: string;
  totalCharsLength: number;
  coloring: SharedValue<number>;
  sliderWidth: SharedValue<number>;
};

const isIOS = Platform.OS === 'ios';

const SLIDER_W = 268;
const SLIDER_FINAL_W = 76;
const SLIDER_H = isIOS ? 76 : 77;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HEIGHT_SCR = Dimensions.get('screen').height;

const AnimSvg = Animated.createAnimatedComponent(Svg);
const AnimRect = Animated.createAnimatedComponent(Rect);

const AnimatedText = ({
  index,
  char,
  coloring,
  sliderWidth,
  totalCharsLength,
}: TAnimatedText) => {
  const textColor = useAnimatedStyle(() => {
    const interval = 1 / (totalCharsLength + 8);

    return {
      opacity: interpolate(sliderWidth.value, [SLIDER_W, 260], [1, 0]),
      color: interpolateColor(
        coloring.value,
        [
          0.2 + (index - 3) * interval,
          0.2 + (index - 2) * interval,
          0.2 + (index - 1) * interval,
          0.2 + index * interval,
          0.2 + (index + 1) * interval,
          0.2 + (index + 2) * interval,
          0.2 + (index + 3) * interval,
        ],
        [
          '#a10000',
          '#ff6161',
          '#ffad9c',
          '#ffffff',
          '#ffad9c',
          '#ff6161',
          '#a10000',
        ],
      ),
    };
  });

  return (
    <Animated.Text key={`index-${index}`} style={[textColor, styles.text]}>
      {char}
    </Animated.Text>
  );
};

const ShutdownScreen = () => {
  const coloring = useSharedValue(0);
  const reachEnd = useSharedValue(false);
  const finishProgress = useSharedValue(0);
  const sliderWidth = useSharedValue(SLIDER_W);

  const chars = 'Slide To Power Off !'.split('');
  const totalCharsLength = chars.length;

  const background = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        sliderWidth.value,
        [SLIDER_W, SLIDER_FINAL_W],
        [0.75, 1],
      ),
    }),
    [],
  );

  const animProps = useAnimatedProps(() => ({
    width: sliderWidth.value,
    opacity: interpolate(sliderWidth.value, [SLIDER_W, 75], [1, 0]),
    transform: [{translateX: SLIDER_W - sliderWidth.value}],
  }));

  const powerBtn = useAnimatedStyle(() => ({
    opacity: interpolate(finishProgress.value, [0, 1], [1, 0]),
    transform: [
      {scale: interpolate(finishProgress.value, [0, 0.2, 1], [1, 1.14, 0])},
    ],
    left: interpolate(sliderWidth.value, [SLIDER_W, SLIDER_FINAL_W], [3, 195]),
  }));

  const gesture = Gesture.Pan()
    .onChange(e => {
      if (e.translationX < 0) {
        sliderWidth.value = SLIDER_W;
      } else if (SLIDER_W - e.translationX > SLIDER_FINAL_W) {
        sliderWidth.value = SLIDER_W - e.translationX;

        if (reachEnd.value) {
          reachEnd.value = false;
        }
      } else if (sliderWidth.value < 90) {
        reachEnd.value = true;
      }
    })
    .onFinalize(() => {
      if (reachEnd.value) {
        finishProgress.value = withTiming(1, {duration: 500}, finished => {
          if (finished) {
            sliderWidth.value = withTiming(SLIDER_W);
            reachEnd.value = false;
            finishProgress.value = withTiming(0);
          }
        });
      } else {
        sliderWidth.value = withTiming(SLIDER_W);
      }
    });

  React.useEffect(() => {
    coloring.value = withRepeat(withTiming(1, {duration: 2250}), 0);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ImageBackground
        style={styles.bg}
        source={{
          uri: 'https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}>
        <Animated.View style={[styles.filterBackground, background]} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={styles.sliderContainer}>
            <View style={styles.sliderInnerContainer}>
              <AnimSvg width={SLIDER_W} height={SLIDER_H}>
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0%" stopColor="#bf3354" />
                    <Stop offset="50%" stopColor="#f43f46" />
                    <Stop offset="100%" stopColor="#fe5334" />
                  </LinearGradient>
                </Defs>
                <AnimRect
                  x="0"
                  y="0"
                  rx="40"
                  fill="url(#grad)"
                  height={SLIDER_H}
                  animatedProps={animProps}
                />
                <View style={styles.textContainer}>
                  {chars.map((char, index) => (
                    <AnimatedText
                      char={char}
                      index={index}
                      coloring={coloring}
                      key={`index-${index}`}
                      sliderWidth={sliderWidth}
                      totalCharsLength={totalCharsLength}
                    />
                  ))}
                </View>
              </AnimSvg>
            </View>
            <Animated.View style={[powerBtn, styles.powerBtn]}>
              <Image
                style={{height: 36, width: 36}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/8820/8820124.png',
                }}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default ShutdownScreen;

const styles = StyleSheet.create({
  bg: {
    width: WIDTH,
    height: HEIGHT_SCR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBackground: {
    width: WIDTH,
    height: HEIGHT_SCR,
    backgroundColor: 'black',
  },
  sliderContainer: {
    marginTop: 150,
    height: SLIDER_H,
    borderRadius: 60,
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'row',
    left: (WIDTH - SLIDER_W) / 2,
  },
  sliderInnerContainer: {
    width: SLIDER_W,
  },
  powerBtn: {
    top: 4,
    padding: 16,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: 'white',
  },
  textContainer: {
    top: 28,
    left: 68,
    zIndex: 100000,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
  },
});
