import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Animated, {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HEIGHT_SCR = Dimensions.get('screen').height;

const screens = [
  {id: '1', name: 'Tab Bar', component: 'TabNavScreen'},
  {id: '2', name: 'Pin Code', component: 'PinCodeScreen'},
  {id: '3', name: 'Parallax', component: 'ParallaxScreen'},
  {id: '4', name: 'Shutdown in IOS', component: 'ShutdownScreen'},
  {id: '5', name: 'Dot Loader', component: 'DotLoaderScreen'},
  {id: '6', name: 'Animated Timer', component: 'AnimatedTimerScreen'},
  {id: '7', name: 'Like Interaction', component: 'LikeInteractionScreen'},
  {id: '8', name: 'Native IOS Toggle', component: 'NativeIOSToggleScreen'},
  {id: '9', name: 'Progress Loader', component: 'ProgressLoaderScreen'},
  {id: '10', name: 'Toggle With Label', component: 'ToggleWithLabelScreen'},
  {id: '11', name: 'Toggle With Symbol', component: 'ToggleWithSymbolScreen'},
  {id: '12', name: 'Arrow Range Picker', component: 'ValueArrowPickerScreen'},
  {id: '13', name: 'Dot Range Picker', component: 'ValueDotPickerScreen'},
  {id: '14', name: 'List Range Picker', component: 'ValueListPickerScreen'},
  {
    id: '15',
    name: 'Parallax With BackDrop',
    component: 'ParallaxBackDropScreen',
  },
  {
    id: '16',
    name: 'Stack Carousel',
    component: 'StackCarouselScreen',
  },
  {
    id: '17',
    name: 'CheckBox',
    component: 'CheckBoxScreen',
  },
];
const HomeScreen = () => {
  const navigation = useNavigation();

  const SLIDER_W = 268;
  const SLIDER_FINAL_W = 76;

  const sliderWidth = useSharedValue(SLIDER_W);

  const background = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        sliderWidth.value,
        [SLIDER_W, SLIDER_FINAL_W],
        [0.8, 1],
      ),
    }),
    [],
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate(item.component)}>
      <Text style={styles.listItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: 'https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg',
      }}>
      <Animated.View style={[styles.filterBackground, background]}>
        <SafeAreaView />
        <FlatList
          data={screens}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ListHeaderComponent={() => <View style={{height: 16}} />}
          ListFooterComponent={() => <View style={{height: 16}} />}
        />
      </Animated.View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  listItem: {
    padding: 16,
    elevation: 5,
    shadowRadius: 8,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 0.3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    borderColor: '#1DE9B6',
    backgroundColor: '#1e1e1e',
  },
  listItemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  filterBackground: {
    width: WIDTH,
    height: HEIGHT_SCR,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
});
