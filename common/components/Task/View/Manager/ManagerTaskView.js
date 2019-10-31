import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';


import DailyTask from '../DailyTask/DailyTask';
import WeeklyTask from '../WeeklyTask/WeeklyTask';
import MonthlyTask from '../MonthlyTask/MonthlyTask';
import CreateTicket from '../../../Ticket/Create/CreateTicket';
import ManagerApartmentInfo from '../ManagerApartmentInfo';




const ManagerTaskView = ({ navigation }) => {
  console.log(navigation.getParam('tabName'));

  const TaskTab = createMaterialTopTabNavigator(
    {
      daily: (props) => (<DailyTask {...props} />),
      weekly: (props) => (<WeeklyTask {...props} />),
      monthly: (props) => (<MonthlyTask {...props} />)
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




  const TaskStackNavigator = createStackNavigator({
    home: {
      screen: TaskTab
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


  const TaskStackAppContainer = createAppContainer(TaskStackNavigator);


  const appModel = navigation.getScreenProps();
  const apartments = appModel.getApartments();

  const tabs = apartments.reduce(((a, v) => {
    a[v.name.replace(/\s+/g, '_')] = {
      screen: () => (<TaskStackAppContainer screenProps={{ ...appModel, apartmentID: v.id }} />),
      navigationOptions: {
        title: v.name,
      },
    }
    return a;
  }), {});

  const ApartmentTab = createMaterialTopTabNavigator(
    tabs,
    {
      // initialRouteName: '',
      lazy: true,
      swipeEnabled: true,
      swipe: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'white',
        scrollEnabled: true,
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
  const ApartmentTabNavigator = createAppContainer(ApartmentTab);

  return <ApartmentTabNavigator screenProps={appModel} />

}

export default ManagerApartmentInfo(ManagerTaskView);
