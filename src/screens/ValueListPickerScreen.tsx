import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

type TScrollOffset = {
  isLast?: boolean;
  unit: string | undefined;
  scrollOffset: SharedValue<number>;
};

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

const ListItemValue = ({
  item,
  index,
  unit,
  isLast,
  scrollOffset,
}: TListItem & TScrollOffset) => {
  const animStyle = useAnimatedStyle(() => ({
    height: 30,
    marginTop: index === 0 ? 20 : 0,
    marginBottom: isLast ? 30 : 0,
    opacity: interpolate(
      scrollOffset.value,
      [
        (index - 4) * 30,
        (index - 3) * 30,
        (index - 2) * 30,
        (index - 1) * 30,
        index * 30,
        (index + 1) * 30,
        (index + 2) * 30,
      ],
      [0.25, 0.5, 1, 0.5, 0.25, 0, 0],
    ),
  }));

  return (
    <Animated.View style={animStyle}>
      <Text style={styles.item}>
        {typeof item === 'number' ? `${item}${unit}` : ''}
      </Text>
    </Animated.View>
  );
};

const ValueListPicker = ({range, unit, value, setValue}: TValueRangePicker) => {
  const scrollRef = useAnimatedRef<FlatList>(); //@ts-ignore
  const scrollOffset = useScrollViewOffset(scrollRef);

  //Empty items to center our first visible item
  const initialArray = ['', ''];
  const outerArray = new Array(range[1] - range[0] + 1)
    .fill(0)
    .map((_, i) => i + range[0]);
  const values = [...initialArray, ...outerArray];

  //Empty items to center our last visible item
  values.push('');
  values.push('');

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const yPosition = event.nativeEvent.contentOffset.y;
    const step = 30;
    const newIndex = yPosition / step;

    if (newIndex !== value) {
      setValue(newIndex + 2);
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    index,
    length: 30 * index,
    offset: 30 * index,
  });

  const renderItem = ({item, index}: TListItem) => (
    <ListItemValue
      key={`list-item-${index}`}
      scrollOffset={scrollOffset}
      item={item}
      index={index}
      unit={unit}
      isLast={index === values.length - 1}
    />
  );

  return (
    <View style={styles.list}>
      <FlatList
        data={values}
        pagingEnabled
        ref={scrollRef}
        initialScrollIndex={2}
        renderItem={renderItem}
        decelerationRate={'normal'}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToOffsets={values.map((_, i) => i * 30)}
        contentContainerStyle={[
          styles.alignCenter,
          {height: values.length * 30 + 50},
        ]}
      />
    </View>
  );
};

const PickerContainer = ({children}: TPickerContainer) => {
  return <View style={styles.pickerWrapper}>{children}</View>;
};

const ValueListPickerScreen = () => {
  const [listValue, setListValue] = React.useState(0);

  return (
    <View style={styles.pickersContainer}>
      <View style={styles.rowAround}>
        <PickerContainer>
          <ValueListPicker
            unit="°"
            value={listValue}
            range={[-28, -10]}
            setValue={setListValue}
          />
        </PickerContainer>
      </View>
    </View>
  );
};

export default ValueListPickerScreen;

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
    borderWidth: 2,
    zIndex: 100000,
    borderRadius: 20,
    borderColor: '#1DE9B6',
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
  alignCenter: {
    flexGrow: 1,
    alignItems: 'center',
  },
  item: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginVertical: 6,
  },
});
