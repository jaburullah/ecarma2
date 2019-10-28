import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './styles';
import ListItem from '../../common/ListItem';

import InfiniteScroll from '../../common/InfiniteScroll';
import ManagerApartmentInfo from '../../Task/View/ManagerApartmentInfo';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CreateTicket from '../Create/CreateTicket';

const SecretaryTicketView = ({ navigation, data, isLoading, isRefreshing, retrieveMore, CB }) => {

  const appModel = navigation.getScreenProps();
  const ticketsRef = firebase.firestore().collection('tickets');

  const updateCallBack = doc => {
    ticketsRef.doc(doc.id).update({
      review: doc.review,
      status: doc.status,
      modifiedDate: new Date()
    });
  };

  const getView = () => {
    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {

      if (!data.length) {
        return (
          <View style={styles.noTaskFound}>
            <Text>No Tickets found</Text>
          </View>
        );
      }


      return (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <ListItem
              index={index}
              appModel={appModel}
              data={item}
              updateCallBack={updateCallBack}
              showDescriptionDialog={true}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        // On End Reached (Takes a function)
        // onEndReached={retrieveMore}
        // How Close To The End Of List Until Next Data Request Is Made
        // onEndReachedThreshold={2}
        // Refreshing (Set To True When End Reached)
        // refreshing={isRefreshing}

        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>{getView()}</View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Create New Ticket"
          color="#DCA50F"
          onPress={() => {
            navigation.navigate('ticket', { apartmentID: navigation.getScreenProps().apartmentID, CB });
          }}
        />
      </View>

    </View>
  );
};


const SecretaryApartmentTicketView = ({ navigation }) => {

  const appModel = navigation.getScreenProps();
  const apartments = appModel.getApartments();

  const SS = InfiniteScroll(SecretaryTicketView, { limit: 10, collection: 'tickets' });

  const TicketStackNavigator = createStackNavigator({
    home: {
      screen: SS
    },
    ticket: {
      screen: CreateTicket
    },
  },
    {
      initialRouteName: 'home',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    });


  const TicketStackAppContainer = createAppContainer(TicketStackNavigator);


  const tabs = apartments.reduce(((a, v) => {
    a[v.name.replace(/\s+/g, '_')] = {
      // screen: SSTab,
      screen: () => (<TicketStackAppContainer screenProps={{ ...appModel, apartmentID: v.id }} />),
      navigationOptions: {
        title: v.name,
      },
    }
    return a;
  }), {});

  const ApartmentTab = createMaterialTopTabNavigator(
    tabs,
    {
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



export default ManagerApartmentInfo(SecretaryApartmentTicketView);
