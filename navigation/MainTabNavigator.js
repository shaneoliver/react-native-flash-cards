import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DeckScreen from '../screens/DeckScreen';
import AddQuestionScreen from '../screens/AddQuestionScreen';
import QuizScreen from '../screens/QuizScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const AddStack = createStackNavigator(
  {
    Links: AddScreen,
  },
  config
);

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={Platform.OS === 'ios' 
      ? `ios-add-circle${focused ? '' : '-outline'}`
      : 'md-add'} />
  ),
};

AddStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AddStack,
  SettingsStack,
});

tabNavigator.path = '';

const mainNavigator = createStackNavigator(
  {
    Home: tabNavigator,
    Deck: {
      screen: DeckScreen,
    },
    AddQuestion: {
      screen: AddQuestionScreen,
    },
    Quiz: {
      screen: QuizScreen,
    },
  },
  config
);

export default mainNavigator;
