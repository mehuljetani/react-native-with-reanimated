import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';

type TProgressProps = {
  step: number;
  steps: number;
  height: number;
};

const Progress = ({step, steps, height}: TProgressProps) => {
  const [width, setWidth] = React.useState(0);
  const animValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const calcWidth = e.nativeEvent.layout.width;
    setWidth(calcWidth);
  }, []);

  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: reactive,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [width, step]);

  return (
    <>
      <Text style={styles.stepsLabel}>{`${step}/${steps}`}</Text>
      <View
        onLayout={onLayout}
        style={[styles.loaderContainer, {height, borderRadius: height}]}>
        <Animated.View
          style={[
            styles.innerLoader,
            {
              height,
              borderRadius: height,
              transform: [{translateX: animValue}],
            },
          ]}
        />
      </View>
    </>
  );
};

const ProgressLoaderScreen = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <Progress step={index} steps={10} height={24} />
    </View>
  );
};

export default ProgressLoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  stepsLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  loaderContainer: {
    overflow: 'hidden',
    backgroundColor: 'rgba(250,250,250,0.1)',
  },
  innerLoader: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#fff',
  },
});
