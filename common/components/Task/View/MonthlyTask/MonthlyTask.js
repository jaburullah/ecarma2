import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

import styles from './styles';
import ListItem from '../../../common/ListItem';
import InfiniteScroll from '../../../common/InfiniteScroll';
import firebase from 'react-native-firebase';

const Monthly = ({ navigation, data, isLoading, isRefreshing, retrieveMore, CB }) => {
  const appModel = navigation.getScreenProps();



  const monthlyTasksRef = firebase.firestore().collection('monthlyTasks');

  const updateReview = doc => {
    monthlyTasksRef.doc(doc.id).update({
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
            <Text>No Tasks found</Text>
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
              updateCallBack={updateReview}
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

export default InfiniteScroll(Monthly, { limit: 10, collection: 'monthlyTasks' });

