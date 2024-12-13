import React, {memo, useRef, useState} from 'react';

import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

import Animated, {
  withTiming,
  processColor,
  useDerivedValue,
  interpolateColor,
  useAnimatedProps,
  createAnimatedPropAdapter,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

const AnimatedCheckMarkPath = memo(props => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const pathRef = useRef(null);
  const {progress, checkMarkColor} = props;
  const [length, setLength] = useState(0);

  const checkMarkAnimation = useAnimatedProps(() => {
    const strokeDashoffset = length - length * progress.value;
    const fillOpacity = progress.value;
    return {strokeDashoffset, fillOpacity};
  });
  return (
    <AnimatedPath
      fill="none"
      ref={pathRef}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={checkMarkColor}
      strokeDasharray={length}
      animatedProps={checkMarkAnimation}
      d="M12 24.4068L20.6667 32.9999L36.5 17.1667"
      onLayout={() => setLength(pathRef.current.getTotalLength())}
    />
  );
});

const AnimatedColor = memo(props => {
  const {
    progress,
    checkedBorderColor,
    unCheckedBorderColor,
    checkedBackgroundColor,
    unCheckedBackgroundColor,
  } = props;
  const AnimationColor = Animated.createAnimatedComponent(Path);

  const animation = useAnimatedProps(
    () => {
      const fill = interpolateColor(
        progress.value,
        [0, 1],
        [unCheckedBackgroundColor, checkedBackgroundColor],
      );
      const stroke = interpolateColor(
        progress.value,
        [0, 1],
        [unCheckedBorderColor, checkedBorderColor],
      );
      return {fill, stroke};
    },
    [],
    createAnimatedPropAdapter(
      props => {
        if (Object.keys(props).includes('fill')) {
          props.fill = {type: 0, payload: processColor(props.fill)};
        }
        if (Object.keys(props).includes('stroke')) {
          props.stroke = {type: 0, payload: processColor(props.stroke)};
        }
      },
      ['fill', 'stroke'],
    ),
  );
  return (
    <AnimationColor
      strokeWidth={4}
      animatedProps={animation}
      d="M2 16C2 8.26801 8.26801 2 16 2H33C40.732 2 47 8.26801 47 16V33C47 40.732 40.732 47 33 47H16C8.26801 47 2 40.732 2 33V16Z"
    />
  );
});

const CustomCheckBox = memo(props => {
  const {
    width,
    height,
    checked,
    checkMarkColor,
    checkedBorderColor,
    unCheckedBorderColor,
    checkedBackgroundColor,
    unCheckedBackgroundColor,
  } = props;
  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  return (
    <Svg width={width} height={height} viewBox="0 0 49 49">
      <AnimatedColor
        progress={progress}
        checkedBorderColor={checkedBorderColor}
        unCheckedBorderColor={unCheckedBorderColor}
        checkedBackgroundColor={checkedBackgroundColor}
        unCheckedBackgroundColor={unCheckedBackgroundColor}
      />
      <AnimatedCheckMarkPath
        progress={progress}
        checkMarkColor={checkMarkColor}
      />
    </Svg>
  );
});

const CheckBoxScreen = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const handleCheckboxPress = () => {
    setChecked(!checked);
  };
  const handleCheckboxPress2 = () => {
    setChecked2(!checked2);
  };
  const handleCheckboxPress3 = () => {
    setChecked3(!checked3);
  };
  const handleCheckboxPress4 = () => {
    setChecked4(!checked4);
  };
  return (
    <View style={styles.container}>
      <View style={styles.marginBottom}>
        <TouchableWithoutFeedback
          style={styles.marginBottom}
          onPress={() => {
            handleCheckboxPress();
          }}>
          <View>
            <CustomCheckBox
              width={50}
              height={50}
              checked={checked}
              checkMarkColor={'#FFA901'}
              checkedBorderColor={'#FFA901'}
              unCheckedBorderColor={'#D9D9D9'}
              checkedBackgroundColor={'#FFA901'}
              unCheckedBackgroundColor={'white'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.marginBottom}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleCheckboxPress2();
          }}>
          <View>
            <CustomCheckBox
              width={50}
              height={50}
              checked={checked2}
              checkMarkColor={'#378BA4'}
              checkedBorderColor={'#378BA4'}
              unCheckedBorderColor={'#81BECE'}
              checkedBackgroundColor={'#378BA4'}
              unCheckedBackgroundColor={'#E8EDE7'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.marginBottom}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleCheckboxPress3();
          }}>
          <View>
            <CustomCheckBox
              width={50}
              height={50}
              checked={checked3}
              checkMarkColor={'#107980'}
              checkedBorderColor={'#107980'}
              unCheckedBorderColor={'#76A1A7'}
              checkedBackgroundColor={'#107980'}
              unCheckedBackgroundColor={'#EDE1CF'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.marginBottom}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleCheckboxPress4();
          }}>
          <View>
            <CustomCheckBox
              width={50}
              height={50}
              checked={checked4}
              checkMarkColor={'#796EA8'}
              checkedBorderColor={'#796EA8'}
              unCheckedBorderColor={'#A6A9C8'}
              checkedBackgroundColor={'#796EA8'}
              unCheckedBackgroundColor={'#D3D9E9'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default CheckBoxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
  marginBottom: {
    marginBottom: 12,
  },
});
