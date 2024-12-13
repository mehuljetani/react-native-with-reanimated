import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import Animated, {
  withDelay,
  withTiming,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimIcon = Animated.createAnimatedComponent(Image);

const DATA = [
  {
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    key: '620e8f67-6552-43b9-9474-a9d8a27892bc',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/39.jpg',
    key: '876d21f8-4146-4112-a799-331c39527537',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/58.jpg',
    key: '7c8a69cf-9122-4bdf-883e-f55946c65c78',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/19.jpg',
    key: 'c8d1f5dd-8630-4b36-9eff-f8cb9bc72f46',
  },
];

const DATA_TO_ADD = [
  {
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    key: '620e8f67-6552-43b9-9474-a9d8a27892bc',
  },
];

type TListItem = {
  item: {
    image: string;
  };
  index: number;
  liked: boolean;
};

type TLikeCounter = {
  counter: number;
  liked: boolean;
  onPress: () => void;
};

const WIDTH = Dimensions.get('window').width;

const ListItem = ({item, index, liked}: TListItem) => {
  const animate = useSharedValue(0);
  const first = useSharedValue(0);

  React.useEffect(() => {
    const toValue = !!liked ? 0 : 144;

    const duration = first.value === 0 ? 0 : 300;

    if (toValue === 0) {
      animate.value =
        first.value === 0
          ? withTiming(toValue, {duration})
          : withDelay((4 - index) * 50, withTiming(toValue, {duration}));
      first.value = 1;
    } else if (toValue === 144) {
      animate.value =
        first.value === 0
          ? withTiming(toValue, {duration})
          : withDelay(index * 50, withTiming(toValue, {duration}));
      first.value = 1;
    }
  }, [liked]);

  const style = useAnimatedStyle(() => {
    if (index === 0) {
      return {
        opacity: interpolate(animate.value, [0, 144], [0, 1]),
        transform: [
          {scale: interpolate(animate.value, [0, 144], [0, 1])},
          {
            translateX: interpolate(
              animate.value,
              [0, 144],
              [(index - 1) * -26, index * -26],
            ),
          },
        ],
      };
    }

    if (index === 4) {
      return {
        opacity: interpolate(animate.value, [0, 144], [1, 0]),
        transform: [
          {scale: interpolate(animate.value, [0, 144], [1, 0.75])},
          {
            translateX: interpolate(
              animate.value,
              [0, 144],
              [(index - 1) * -26, (index - 1) * -36],
            ),
          },
        ],
      };
    }

    return {
      opacity: 1,
      transform: [
        {
          translateX: interpolate(
            animate.value,
            [0, 144],
            [(index - 1) * -26, index * -26],
          ),
        },
      ],
    };
  });

  return (
    <Animated.Image
      borderRadius={100}
      source={{uri: item.image}}
      style={[style, styles.img]}
    />
  );
};

const LikeCounter = ({counter, liked, onPress}: TLikeCounter) => {
  const animate = useSharedValue(0);
  const first = React.useRef(0);

  React.useEffect(() => {
    const toValue = !!liked ? 144 : 0;

    if (first.current === 0 && !liked) {
      first.current = 1;
    } else if (first.current === 0 && liked) {
      animate.value = withTiming(toValue, {duration: 1});
      first.current = 1;
    } else {
      animate.value = withSpring(toValue, {damping: 12});
    }
  }, [liked]);

  return (
    <View onTouchStart={onPress} style={styles.counterContainer}>
      <AnimIcon
        style={styles.heart}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/17069/17069463.png',
        }}
      />
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

const LikeInteractionScreen = () => {
  const listData = [...DATA, ...DATA_TO_ADD];
  const [liked, setLiked] = React.useState(false);
  const [counter, setCounter] = React.useState(139);

  const onPress = () => {
    setCounter(old => (old === 139 ? 140 : 139));
    setLiked(old => !old);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <LikeCounter counter={counter} liked={liked} onPress={onPress} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {listData.reverse().map((item, index) => (
            <ListItem key={index} item={item} index={index} liked={liked} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default LikeInteractionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  img: {
    width: 42,
    borderWidth: 2,
    aspectRatio: 1 / 1,
    borderColor: 'white',
    position: 'absolute',
  },
  counterContainer: {
    borderRadius: 100,
    paddingVertical: 9,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#e9e9e9',
  },
  counter: {
    marginLeft: 10,
    color: '#666666',
  },
  heart: {height: 24, width: 24},
});
