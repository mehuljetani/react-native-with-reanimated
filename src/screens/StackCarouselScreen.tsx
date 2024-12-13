import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {
  State,
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const data = [
  {
    image:
      'https://images.pexels.com/photos/1887624/pexels-photo-1887624.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/2361600/pexels-photo-2361600.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/1643773/pexels-photo-1643773.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/2443865/pexels-photo-2443865.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/845405/pexels-photo-845405.jpeg?auto=compress&cs=tinysrgb&w=600',
  },

  {
    image:
      'https://images.pexels.com/photos/1855221/pexels-photo-1855221.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/3375674/pexels-photo-3375674.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/1887629/pexels-photo-1887629.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/3333923/pexels-photo-3333923.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/1726781/pexels-photo-1726781.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/1881352/pexels-photo-1881352.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/3309437/pexels-photo-3309437.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/3389536/pexels-photo-3389536.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    image:
      'https://images.pexels.com/photos/1900203/pexels-photo-1900203.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const Card = ({
  item,
  index,
  prevIndex,
  dataLength,
  currentIndex,
  animatedValue,
  maxVisibleItems,
}) => {
  const IMAGE_WIDTH = 270;
  const IMAGE_HEIGHT = 400;

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-36, 1, 36],
    );
    const translateY2 = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-200, 1, 200],
    );
    const scale = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.9, 1, 1.1],
    );
    const opacity = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [1, 1, 0],
    );
    return {
      transform: [
        {
          translateY: index === prevIndex.value ? translateY2 : translateY,
        },
        {scale},
      ],
      opacity:
        index < currentIndex.value + maxVisibleItems - 1
          ? opacity
          : index === currentIndex.value + maxVisibleItems - 1
          ? withTiming(1)
          : withTiming(0),
    };
  });

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (currentIndex.value !== 0) {
            animatedValue.value = withTiming((currentIndex.value -= 1));
            prevIndex.value = currentIndex.value - 1;
          }
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (currentIndex.value !== dataLength - 1) {
              animatedValue.value = withTiming((currentIndex.value += 1));
              prevIndex.value = currentIndex.value;
            }
          }
        }}>
        <Animated.Image
          source={{uri: item.image}}
          style={[
            styles.image,
            {
              zIndex: dataLength - index,
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
            },
            animatedStyle,
          ]}
        />
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const CardContainer = ({data, maxVisibleItems}) => {
  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);
  return (
    <>
      {data.map((item, index) => {
        return (
          <Card
            item={item}
            key={index}
            index={index}
            prevIndex={prevIndex}
            dataLength={data.length}
            currentIndex={currentIndex}
            animatedValue={animatedValue}
            maxVisibleItems={maxVisibleItems}
          />
        );
      })}
    </>
  );
};
const StackCarouselScreen = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <CardContainer data={data} maxVisibleItems={6} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default StackCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 24,
    position: 'absolute',
  },
});
