import React, { Fragment } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


import styles from './styles';

import WeeklyTask from '../WeeklyTask/WeeklyTask';
import MonthlyTask from '../MonthlyTask/MonthlyTask';
import DailyTask from '../DailyTask/DailyTask';

const SecretaryTaskView = createMaterialTopTabNavigator(
  {
    daily: DailyTask,
    weekly: WeeklyTask,
    monthly: MonthlyTask,
  },
  {
    lazy: true,
    swipeEnabled: true,
    swipe: true,
    animationEnabled: true,
    tabBarOptions: {
      scrollEnabled: false,
      activeTintColor: 'white',
      inactiveTintColor: 'white',

      indicatorStyle: {
        backgroundColor: 'yellow',
      },
      style: {
        backgroundColor: '#482114',
        elevation: 0,
        // backgroundColor: 'transparent'
      },
    },
  },
);

export default SecretaryTaskView;