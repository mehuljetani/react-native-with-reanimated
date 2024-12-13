import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type TValueRangePicker = {
  range: [number, number];
  unit?: string;
  value: number;
  setValue: (value: number) => void;
};

type TPickerContainer = {
  children: JSX.Element | JSX.Element[];
};

const ValueDotPicker = ({range, unit, value, setValue}: TValueRangePicker) => {
  const ctxY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [dotValue, setDotValue] = React.useState(value);

  const values = new Array(range[1] - range[0] + 1)
    .fill(0)
    .map((_, i) => i + range[0]);

  const panGest = Gesture.Pan()
    .onBegin(() => {
      ctxY.value = translateY.value;
    })
    .onChange(e => {
      if (
        ctxY.value + e.translationY > -2 &&
        ctxY.value + e.translationY < 114
      ) {
        const step = 114 / values.length;
        const index = Math.floor(
          (ctxY.value + e.translationY) / step <= 0
            ? 0
            : (ctxY.value + e.translationY) / step,
        );

        if (values[index] !== value) {
          runOnJS(setDotValue)(values[index]);
        }

        translateY.value = withSpring(ctxY.value + e.translationY, {
          damping: 17,
        });
      }
    })
    .onEnd(() => {
      runOnJS(setValue)(dotValue);
    });

  const pressGest = Gesture.Tap()
    .onStart(e => {
      if (e.y > 54 && e.y < 174) {
        const step = 120 / values.length;
        const index = Math.floor((e.y - 54) / step);

        runOnJS(setDotValue)(values[index]);

        translateY.value = withSpring(step * index, {
          damping: 17,
        });
      }
    })
    .onEnd(() => {
      runOnJS(setValue)(dotValue);
    });

  const dotPickerStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const composedGestures = Gesture.Simultaneous(panGest, pressGest);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.value}>{`${dotValue}${unit}`}</Text>
        <View>
          <View style={styles.line} />
          <Animated.View style={[dotPickerStyle, styles.dot]} />
          <GestureDetector gesture={composedGestures}>
            <Animated.View style={[styles.gestureTransparentBox]} />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const PickerContainer = ({children}: TPickerContainer) => {
  return <View style={styles.pickerWrapper}>{children}</View>;
};

const ValueDotPickerScreen = () => {
  const [dotValue, setDotValue] = React.useState(0);

  return (
    <View style={styles.pickersContainer}>
      <View style={styles.rowAround}>
        <PickerContainer>
          <ValueDotPicker
            unit="°"
            range={[0, 18]}
            value={dotValue}
            setValue={setDotValue}
          />
        </PickerContainer>
      </View>
    </View>
  );
};

export default ValueDotPickerScreen;

const styles = StyleSheet.create({
  pickersContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  rowAround: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerWrapper: {
    width: 64,
    height: 200,
    zIndex: 100000,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#161616',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
    color: 'white',
    marginBottom: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  line: {
    width: 3,
    height: 112,
    alignSelf: 'center',
    backgroundColor: '#1DE9B6',
  },
  dot: {
    top: -9,
    width: 18,
    height: 18,
    borderWidth: 3,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    borderColor: '#161616',
    backgroundColor: 'white',
  },
  gestureTransparentBox: {
    top: -56,
    width: 40,
    height: 186,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
