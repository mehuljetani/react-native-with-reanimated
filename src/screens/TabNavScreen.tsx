import React from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HEIGHT_SCR = Dimensions.get('screen').height;

type TData = {
  image: any;
  key: string;
  ref: any;
  title: string;
};

type ListItem = {
  item: {image: string};
};

type TMeasure = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type TIndicator = {
  measures: TMeasure[];
  scrollX: any;
};

type TTab = {
  item: TData;
  onItemPress: (event: GestureResponderEvent) => void;
};

type TTabs = {
  data: TData[];
  scrollX: Animated.AnimatedValue;
  onItemPress: Function;
};

const images = {
  tab1: 'https://images.pexels.com/photos/13979460/pexels-photo-13979460.jpeg?auto=compress&cs=tinysrgb&w=600',
  tab2: 'https://images.pexels.com/photos/19211468/pexels-photo-19211468/free-photo-of-mountain-village-in-himalayan-mountains.jpeg?auto=compress&cs=tinysrgb&w=600',
  tab3: 'https://images.pexels.com/photos/28206557/pexels-photo-28206557/free-photo-of-snow.jpeg?auto=compress&cs=tinysrgb&w=600',
  tab4: 'https://images.pexels.com/photos/28238899/pexels-photo-28238899/free-photo-of-key-monastery.jpeg?auto=compress&cs=tinysrgb&w=600',
  tab5: 'https://images.pexels.com/photos/20883700/pexels-photo-20883700/free-photo-of-aerial-view-of-the-kalpa-village-in-the-himalays-in-india.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i as keyof typeof images],
  ref: React.createRef(),
}));

const ListWithIndicatorItem = ({item}: ListItem) => {
  return (
    <View style={{width: WIDTH, height: HEIGHT_SCR}}>
      <Image source={{uri: item.image}} style={styles.img} />
      <View style={[StyleSheet.absoluteFillObject, styles.bg]} />
    </View>
  );
};

const Tab = React.forwardRef(({item, onItemPress}: TTab, ref: any) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={styles.label}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({measures, scrollX}: TIndicator) => {
  const inputRange = data.map((_, i) => i * WIDTH);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure: TMeasure) => measure.width),
  });
  const indicatorLeft = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure: TMeasure) => measure.x),
  });

  return (
    <Animated.View
      style={[
        styles.indicatorContainer,
        {width: indicatorWidth, left: indicatorLeft},
      ]}
    />
  );
};

const Tabs = ({data, scrollX, onItemPress}: TTabs) => {
  const [measures, setMeasures] = React.useState<TMeasure[]>([]);
  const containerRef = React.useRef<any>();

  React.useEffect(() => {
    // Only update the measurements once, not continuously
    const m: TMeasure[] = [];

    const measureTabs = () => {
      data.forEach(item => {
        item.ref.current.measureLayout(
          containerRef.current,
          (x: number, y: number, width: number, height: number) => {
            m.push({
              x,
              y,
              width,
              height,
            });

            if (m.length === data.length) {
              setMeasures(m); // Set the measures after all tabs are measured
            }
          },
        );
      });
    };

    measureTabs(); // Call the measurement function when the component mounts
  }, [data]); // Only run the effect when `data` changes, not `measures`

  return (
    <View style={styles.tabContainer}>
      <View ref={containerRef} style={styles.tabsContainer}>
        {data.map((item, index) => (
          <Tab
            ref={item.ref}
            key={item.key}
            item={item}
            onItemPress={() => {
              onItemPress(index);
            }}
          />
        ))}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const TabNavScreen = () => {
  const flatRef = React.useRef<any>();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onItemPress = React.useCallback((itemIndex: number) => {
    !!flatRef.current &&
      flatRef.current.scrollToOffset({
        offset: itemIndex * WIDTH,
      });
  }, []);

  const renderItem = React.useCallback(
    ({item}: ListItem) => <ListWithIndicatorItem item={item} />,
    [],
  );

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        data={data}
        ref={flatRef}
        pagingEnabled
        bounces={false}
        onScroll={onScroll}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tabContainer: {
    top: 100,
    width: WIDTH,
    position: 'absolute',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  indicatorContainer: {
    height: 3,
    bottom: -10,
    position: 'absolute',
    backgroundColor: '#000',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 84 / data.length,
    textTransform: 'uppercase',
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default TabNavScreen;
