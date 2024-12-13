import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import TabNavScreen from '../screens/TabNavScreen';
import PinCodeScreen from '../screens/PinCodeScreen';
import ParallaxScreen from '../screens/ParallaxScreen';
import ShutdownScreen from '../screens/ShutdownScreen';
import CheckBoxScreen from '../screens/CheckBoxScreen';
import DotLoaderScreen from '../screens/DotLoaderScreen';
import AnimatedTimerScreen from '../screens/AnimatedTimerScreen';
import StackCarouselScreen from '../screens/StackCarouselScreen';
import ProgressLoaderScreen from '../screens/ProgressLoaderScreen';
import ValueDotPickerScreen from '../screens/ValueDotPickerScreen';
import ToggleWithLabelScreen from '../screens/ToggleWithLabelScreen';
import ValueListPickerScreen from '../screens/ValueListPickerScreen';
import LikeInteractionScreen from '../screens/LikeInteractionScreen';
import NativeIOSToggleScreen from '../screens/NativeIOSToggleScreen';
import ValueArrowPickerScreen from '../screens/ValueArrowPickerScreen';
import ToggleWithSymbolScreen from '../screens/ToggleWithSymbolScreen';
import ParallaxBackDropScreen from '../screens/ParallaxBackDropScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TabNavScreen" component={TabNavScreen} />
        <Stack.Screen name="PinCodeScreen" component={PinCodeScreen} />
        <Stack.Screen name="ParallaxScreen" component={ParallaxScreen} />
        <Stack.Screen name="ShutdownScreen" component={ShutdownScreen} />
        <Stack.Screen name="CheckBoxScreen" component={CheckBoxScreen} />
        <Stack.Screen name="DotLoaderScreen" component={DotLoaderScreen} />
        <Stack.Screen
          name="ParallaxBackDropScreen"
          component={ParallaxBackDropScreen}
        />
        <Stack.Screen
          name="StackCarouselScreen"
          component={StackCarouselScreen}
        />
        <Stack.Screen
          name="AnimatedTimerScreen"
          component={AnimatedTimerScreen}
        />
        <Stack.Screen
          name="LikeInteractionScreen"
          component={LikeInteractionScreen}
        />
        <Stack.Screen
          name="NativeIOSToggleScreen"
          component={NativeIOSToggleScreen}
        />
        <Stack.Screen
          name="ProgressLoaderScreen"
          component={ProgressLoaderScreen}
        />
        <Stack.Screen
          name="ToggleWithLabelScreen"
          component={ToggleWithLabelScreen}
        />
        <Stack.Screen
          name="ToggleWithSymbolScreen"
          component={ToggleWithSymbolScreen}
        />
        <Stack.Screen
          name="ValueArrowPickerScreen"
          component={ValueArrowPickerScreen}
        />
        <Stack.Screen
          name="ValueDotPickerScreen"
          component={ValueDotPickerScreen}
        />
        <Stack.Screen
          name="ValueListPickerScreen"
          component={ValueListPickerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
