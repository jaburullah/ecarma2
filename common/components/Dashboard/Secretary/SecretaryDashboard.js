import React, { Fragment } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


import styles from './styles';

import DailyTask from '../../Task/View/DailyTask/DailyTask';
import WeeklyTask from '../../Task/View/WeeklyTask/WeeklyTask';
import MonthlyTask from '../../Task/View/MonthlyTask/MonthlyTask';

const SecretaryDashboard = createMaterialTopTabNavigator(
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

export default SecretaryDashboard;