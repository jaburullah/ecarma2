import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

import styles from './styles';
import ListItem from '../common/ListItem';
import firebase from 'react-native-firebase';

const Daily = ({ navigation }) => {
  const appModel = navigation.getScreenProps();
  const dailyTickets = firebase.firestore().collection('dailyTickets');

  const [dataItem, setDataItem] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  dailyTickets
    .get()
    .then(data => {
      if (isLoading) {
        let listData = [];
        data.docs.forEach(o => {
          let d = o.data();
          d.id = o.id;
          listData.push(d);
        });
        setDataItem(listData);
        setLoading(false);
      }
      console.log('Daily getting');
    })
    .catch(e => console.log(e));

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
          data={dataItem}
          renderItem={({ item, index }) => (
            <ListItem
              index={index}
              appModel={appModel}
              data={item}
              updateCallBack={updateCallBack}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>{getView()}</View>
      {appModel.isSecretary() && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Create New Task"
            color="#DCA50F"
            onPress={() => {
              navigation.navigate('task');
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Daily;
