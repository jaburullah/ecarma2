import React, { Fragment } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


import styles from './styles';

import Daily from '../../Daily/Daily';
import Weekly from '../../Weekly/Weekly';
import Monthly from '../../Monthly/Monthly';

const SecretaryDashboard = createMaterialTopTabNavigator(
  {
    daily: Daily,
    weekly: Weekly,
    monthly: Monthly,
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