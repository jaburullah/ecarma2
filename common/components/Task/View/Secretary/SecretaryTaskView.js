import React, { Fragment } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';
import CreateTicket from '../../../Ticket/Create/CreateTicket';

import styles from './styles';

import DailyTask from '../DailyTask/DailyTask';
import WeeklyTask from '../WeeklyTask/WeeklyTask';
import MonthlyTask from '../MonthlyTask/MonthlyTask';
import ManagerApartmentInfo from '../ManagerApartmentInfo';




const Nav = ({ navigation }) => {
  console.log(navigation.getParam('tabName'));
  const ApartmentTab = createMaterialTopTabNavigator(
    {
      daily: (props) => (<DailyTask {...props} />),
      weekly: (props) => (<WeeklyTask {...props} />),
      monthly: (props) => (<MonthlyTask {...props} />),
    },
    {
      initialRouteName: navigation.getParam('tabName'),
      lazy: true,
      swipeEnabled: true,
      swipe: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'white',
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


  const AppNavigator = createStackNavigator({
    home: {
      screen: ApartmentTab
    },
    ticket: {
      screen: CreateTicket
    },
  },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    });

  const SubNavigator = createAppContainer(AppNavigator);





  const appModel = navigation.getScreenProps();
  const apartments = appModel.getApartments();

  return <SubNavigator screenProps={{ ...appModel, apartmentID: apartments[0].id }} />
}


export default ManagerApartmentInfo(Nav);
