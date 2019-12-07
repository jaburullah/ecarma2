/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { StyleSheet, StatusBar, Animated, Easing, ToastAndroid } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Login from './common/components/Login/Login';

import SecretaryDashboard from './common/components/Dashboard/Secretary/SecretaryDashboard';
import ManagerDashboard from './common/components/Dashboard/Manager/ManagerDashboard';

import CreateTicket from './common/components/Ticket/Create/CreateTicket';
import SecretaryTicketView from './common/components/Ticket/View/SecretaryTicketView';

import SecretaryTaskView from './common/components/Task/View/Secretary/SecretaryTaskView';
// import ManagerTaskView from './common/components/Task/View/Manager/ManagerTaskView';

import Icon from 'react-native-vector-icons/Ionicons';
import { model } from './common/model/model'
import ManagerTaskView from './common/components/Task/View/Manager/ManagerTaskView';
import ManagerTicketView from './common/components/Ticket/View/ManagerTicketView';
import UserProfile from './common/components/UserProfile/UserProfile';


const navigationOptions = ({ navigation }) => {


  return {
    title: '',
    drawerLabel: '',
    headerLeft: (
      <Icon
        style={{ paddingLeft: 10 }}
        name="md-menu"
        size={30}
        color="#fff"
        onPress={() => console.log('menu')}
      />
    ),
    headerRight: [
      <Icon
        key={'profile'}
        style={{ paddingRight: 10 }}
        name="md-person"
        color="#fff"
        size={30}
        onPress={() => {
          if (!AppModel.getUserID()) {
            ToastAndroid.show("Please login..", ToastAndroid.SHORT)
          }
          else {
            navigation.navigate('user_profile');
          }
        }
        }
      />,
      <Icon
        key={'search'}
        style={{ paddingRight: 10 }}
        name="md-search"
        color="#fff"
        size={30}
        onPress={() => console.log('search')}
      />,
      <Icon
        key={'notifications'}
        style={{ paddingRight: 10 }}
        name="md-notifications"
        color="#fff"
        size={30}
        onPress={() => console.log('bell')}
      />,
    ],
    headerStyle: {
      backgroundColor: '#482114',
      elevation: 0,
    },
    headerTintColor: '#fff',
  };
}

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp'
      });

      const scaleY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp'
      });

      return {
        opacity,
        transform: [{ scaleY }]
      }
    }
  }
}


const AppNavigator = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: navigationOptions
  },
  manager_dashboard: {
    screen: ManagerDashboard,
    navigationOptions: navigationOptions,
  },
  manager_task_view: {
    screen: ManagerTaskView,
    navigationOptions: navigationOptions,
  },
  manager_ticket_view: {
    screen: ManagerTicketView,
    navigationOptions: navigationOptions,
  },
  user_profile: {
    screen: UserProfile,
    navigationOptions: navigationOptions,
  },
  secretary_dashboard: {
    screen: SecretaryDashboard,
    navigationOptions: navigationOptions,
  },
  secretary_task_view: {
    screen: SecretaryTaskView,
    navigationOptions: navigationOptions,
  },
  secretary_ticket_view: {
    screen: SecretaryTicketView,
    navigationOptions: navigationOptions,
  },

  // create_ticket: {
  //   screen: CreateTicket,
  //   navigationOptions: navigationOptions,
  // },
}, {
  transitionConfig
});




const Navigator = createAppContainer(AppNavigator);
const AppModel = model({ roles: [] });
AppModel.refresh = true;
// const AppModel = model({ roles: ['manager'], apartments: [{ name: "apartment 1", id: 1 }, { name: "apartment 2", id: 2 }] });
// const AppModel = model({ roles: ['secretary'], apartments: [{ name: "apartment 1", id: 'ANorAj4YrpleFZECjC6g' }] });

const App = () => {
  return <Navigator screenProps={AppModel} />
}

export default App
