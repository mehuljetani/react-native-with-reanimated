import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

type TListItem = {
  item: number | string;
  index: number;
};

type TValueRangePicker = {
  range: [number, number];
  unit?: string;
  value: number;
  setValue: (value: number) => void;
};

type TPickerContainer = {
  children: JSX.Element | JSX.Element[];
};

const ListItem = React.memo(({item, index, unit, scrollOffset}: TListItem) => {
  const animStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [
        index * 112 - 40,
        index * 112 - 20,
        index * 112,
        index * 112 + 20,
        index * 112 + 40,
      ],
      [0.2, 0.5, 1, 0.5, 0.2],
    ),
  }));

  return (
    <Animated.View style={[animStyle, styles.itemContainer]}>
      <Text style={styles.itemList}>{`${item}${unit}`}</Text>
    </Animated.View>
  );
});

const Arrow = ({direction, onPress = () => {}, disabled = false}: TArrow) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled}>
    <Image
      style={{height: 15, width: 15}}
      source={{
        uri:
          direction === 'up'
            ? 'https://cdn-icons-png.flaticon.com/128/7268/7268569.png'
            : 'https://cdn-icons-png.flaticon.com/128/8791/8791171.png',
      }}
      tintColor={
        disabled ? 'rgba(255,255,255, 0.20)' : 'rgba(255,255,255, 0.80)'
      }
    />
  </TouchableOpacity>
);

const ValueArrowPicker = ({
  range,
  unit,
  value = range[0],
  setValue,
}: TValueRangePicker) => {
  const listRef = useAnimatedRef<FlatList>(); //@ts-ignore
  const scrollOffset = useScrollViewOffset(listRef);

  const values = new Array(range[1] - range[0] + 1)
    .fill(0)
    .map((_, i) => i + range[0]);

  const renderItem = ({item, index}: {item: number; index: number}) => (
    <ListItem
      item={item}
      index={index}
      unit={unit}
      scrollOffset={scrollOffset}
      key={`arrow-list-item-${index}`}
    />
  );

  const onPressArrow = (direction: 'up' | 'down') => {
    const index = values.indexOf(value);
    listRef.current?.scrollToIndex({
      index: direction === 'down' ? index + 1 : index - 1,
    });
  };

  const onViewableItemsChanged = ({viewableItems}: TViewableItems) => {
    setValue(viewableItems?.[0]?.item);
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    {onViewableItemsChanged},
  ]);

  return (
    <View style={styles.itemsCenter}>
      <Arrow
        direction={'up'}
        disabled={value === range[0]}
        onPress={() => onPressArrow('up')}
      />
      <View style={{height: 112}}>
        <FlatList
          ref={listRef}
          data={values}
          pagingEnabled
          renderItem={renderItem}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100,
          }} //@ts-ignore
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Arrow
        direction={'down'}
        disabled={value === range[1]}
        onPress={() => onPressArrow('down')}
      />
    </View>
  );
};

const PickerContainer = ({children}: TPickerContainer) => {
  return <View style={styles.pickerWrapper}>{children}</View>;
};

const ValueArrowPickerScreen = () => {
  const [arrowListValue, setArrowListValue] = React.useState(0);

  return (
    <View style={styles.pickersContainer}>
      <View style={styles.rowAround}>
        <PickerContainer>
          <ValueArrowPicker
            unit="°"
            range={[-28, -10]}
            value={arrowListValue}
            setValue={setArrowListValue}
          />
        </PickerContainer>
      </View>
    </View>
  );
};

export default ValueArrowPickerScreen;

const styles = StyleSheet.create({
  pickersContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#000',
    justifyContent: 'center',
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
    borderColor: '#F48FB1',
    backgroundColor: '#161616',
  },
  value: {
    fontSize: 16,
    color: 'white',
    marginBottom: 24,
    fontWeight: '600',
    alignSelf: 'center',
  },
  list: {
    flex: 1,
  },
  item: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginVertical: 6,
  },
  itemsCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 112,
    justifyContent: 'center',
  },
  itemList: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
