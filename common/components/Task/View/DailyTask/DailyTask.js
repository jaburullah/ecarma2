import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

import styles from './styles';
import ListItem from '../../../common/ListItem';

import InfiniteScroll from '../../../common/InfiniteScroll';

const DailyTask = ({ navigation, data, isLoading, isRefreshing, retrieveMore }) => {
  console.log(data, navigation);
  const appModel = navigation.getScreenProps();


  const updateCallBack = doc => {
    dailyTickets.doc(doc.id).update({
      review: doc.review,
      status: doc.status,
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
          onEndReached={retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={2}
          // Refreshing (Set To True When End Reached)
          refreshing={isRefreshing}

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

export default InfiniteScroll(DailyTask, { limit: 10, collection: 'dailyTasks' });
