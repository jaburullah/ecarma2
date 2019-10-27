import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './styles';
import ListItem from '../../common/ListItem';

import InfiniteScroll from '../../common/InfiniteScroll';
import ManagerApartmentInfo from '../../Task/View/ManagerApartmentInfo';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CreateTicket from '../Create/CreateTicket';

const SecretaryTicketView = ({ navigation, data, isLoading, isRefreshing, retrieveMore }) => {

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
            navigation.navigate('ticket');
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
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    });


  const TicketStackAppContainer = createAppContainer(TicketStackNavigator);

  return <TicketStackAppContainer screenProps={{ ...appModel, apartmentID: apartments[0].id }} />

}



export default ManagerApartmentInfo(SecretaryApartmentTicketView);
