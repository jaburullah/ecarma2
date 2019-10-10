import React from 'react';
import { View, Text } from 'react-native';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import ApartmentTab from './ApartmentTab';

const ManagerTaskView = createMaterialTopTabNavigator(
  {
    sobha: ApartmentTab,
    mantri: ApartmentTab,
    pride: ApartmentTab,
    hill_view: {
      screen: ApartmentTab,
      navigationOptions: {
        title: 'hill view',
      },
    },
  },
  {
    lazy: true,
    swipeEnabled: true,
    swipe: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      // scrollEnabled: true,
      inactiveTintColor: 'white',

      indicatorStyle: {
        backgroundColor: 'yellow',
      },
      style: {
        backgroundColor: '#482114',
        elevation: 0,
      },
    },
  },
);

export default ManagerTaskView;
