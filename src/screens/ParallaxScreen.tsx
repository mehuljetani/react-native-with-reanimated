import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const images = [
  'https://images.pexels.com/photos/3389539/pexels-photo-3389539.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/861443/pexels-photo-861443.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1888403/pexels-photo-1888403.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3679453/pexels-photo-3679453.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2888492/pexels-photo-2888492.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3584283/pexels-photo-3584283.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3680319/pexels-photo-3680319.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3151191/pexels-photo-3151191.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2310642/pexels-photo-2310642.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const data = images.map((image, index) => ({
  photo: image,
  key: String(index),
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = WIDTH * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;

type ParallaxItemProps = {
  photo: string;
  avatar_url: string;
};

type ParallaxListItemProps = {
  index: number;
  item: ParallaxItemProps;
};

const ImplementedWith = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.containerImplemented, {top: insets.top + 16}]}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
    </View>
  );
};

const ParallaxListItem = ({
  item,
  index,
  scrollX,
}: ParallaxListItemProps & {
  scrollX: Animated.Value;
}) => {
  const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];
  const outputRange = [0.7 * -WIDTH, 0, 0.7 * WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <View style={styles.containerParallaxListItem}>
      <View style={styles.innerContainer}>
        <View style={styles.mainImgContainer}>
          <Animated.Image
            source={{uri: item.photo}}
            style={[styles.mainImg, {transform: [{translateX}]}]}
          />
        </View>
        <Image source={{uri: item.avatar_url}} style={styles.avatar} />
      </View>
    </View>
  );
};

const ParallaxScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderItem = React.useCallback(
    ({item, index}: ParallaxListItemProps) => (
      <ParallaxListItem item={item} index={index} scrollX={scrollX} />
    ),
    [],
  );

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  return (
    <View style={styles.container}>
      <ImplementedWith />
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ParallaxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  containerImplemented: {
    left: 20,
    position: 'absolute',
  },
  implemented: {
    fontSize: 22,
    color: 'black',
  },
  label: {
    fontSize: 18,
    color: 'black',
  },
  containerParallaxListItem: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 10,
    elevation: 50,
    borderRadius: 14,
    backgroundColor: 'white',
  },
  mainImgContainer: {
    borderRadius: 12,
    width: ITEM_WIDTH,
    overflow: 'hidden',
    height: ITEM_HEIGHT,
  },
  mainImg: {
    alignSelf: 'center',
    resizeMode: 'cover',
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH * 1.4,
  },
  avatar: {
    width: 60,
    right: 45,
    height: 60,
    bottom: -30,
    borderWidth: 6,
    borderRadius: 30,
    resizeMode: 'cover',
    borderColor: 'white',
    position: 'absolute',
  },
});
