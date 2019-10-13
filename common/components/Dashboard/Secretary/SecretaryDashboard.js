import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import firebase from 'react-native-firebase';

function numLengthCheck(num) {
  num = num + '';
  num = num.length >= 2 ? num : '0' + num;
  return num;
}

function calculatePercentage(ticketCount, totalTicketCount) {
  let s = Math.floor(ticketCount / totalTicketCount * 100)
  return isNaN(s) ? 0 : s;
}

function separateTickets(data, type) {
  let sadTickets = [];
  let normalTickets = [];
  let happyTickets = [];
  let noReview = [];
  data.forEach(o => {
    let d = o.data();
    if (d.review === 'happy') {
      happyTickets.push(d);
    } else if (d.review === 'normal') {
      normalTickets.push(d);
    } else if (d.review === 'sad') {
      sadTickets.push(d);
    }
    else {
      noReview.push(d);
    }
  });

  let totalCount =
    sadTickets.length + normalTickets.length + happyTickets.length;
  let allCount = data.length;
  let m = {
    name: type,
    title: type.toUpperCase(),
    openTicketCount: numLengthCheck(noReview.length),
    happyPercent: numLengthCheck(
      calculatePercentage(happyTickets.length, totalCount),
    ),
    normalPercent: numLengthCheck(
      calculatePercentage(normalTickets.length, totalCount),
    ),
    sadPercent: numLengthCheck(
      calculatePercentage(sadTickets.length, totalCount),
    ),
  };

  let s = [+m.happyPercent, +m.normalPercent, +m.sadPercent]
  let maxS = Math.max(...s);
  if (maxS === +m.happyPercent) {
    m.max = 'happy'
  }
  else if (maxS === +m.normalPercent) {
    m.max = 'normal'
  }
  else if (maxS === +m.sadPercent) {
    m.max = 'sad'
  }
  return m;
}

const SecretaryDashboard = ({ navigation }) => {
  const appModel = navigation.getScreenProps();
  const onTouchTask = () => {
    navigation.navigate('secretary_task_view');
  };

  const [state, setState] = React.useState({
    tickets: [],
    isLoading: true
  });

  const db = firebase.firestore();
  const ticketsRef = db.collection('tickets');
  const dailyTasksRef = db.collection('dailyTasks');
  const weeklyTasksRef = db.collection('weeklyTasks');
  const monthlyTasksRef = db.collection('monthlyTasks');

  Promise.all([ticketsRef.get(), dailyTasksRef.get(), weeklyTasksRef.get(), monthlyTasksRef.get()])
    .then((data) => {
      const titles = ['tickets', 'daily', 'weekly', 'monthly']
      let dd = data.map((d, i) => {
        return separateTickets(d._docs, titles[i]);
      });
      setState(c => ({ tickets: dd, isLoading: false }));
    })
    .catch(e => console.log(e));


  const showSmiley = (o) => {
    if (o.max === 'happy' || true) {
      return (<View style={[styles.taskSmileyContainer]}>
        <Image
          style={styles.taskSmiley}
          source={require('../../../assets/happy_smiley_big.png')}
        />
        <Text style={styles.taskSmileyText}>{o.happyPercent}%</Text>
      </View>)
    }
  }

  const getView = () => {
    if (state.isLoading) {
      return (
        <View style={styles.taskLoadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return state.tickets.map((o, i) => {
        return (
          <View key={`${o.name}_${i}`} style={styles.taskContainer}>
            <View style={styles.taskCountContainer}>
              <TouchableOpacity onPress={onTouchTask}>
                <View style={styles.taskCount}>
                  <Text style={styles.taskTextTitle}>OPEN TASK</Text>
                  <Text style={styles.taskTextCount}>{o.openTicketCount}</Text>
                  <Text style={styles.taskTextTitle}>{o.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.taskSmileyParentContainer}>{showSmiley(o)}
            </View>
          </View>
        );
      }); ``
    }
  };

  return (
    <ScrollView style={styles.parent}>
      <View style={styles.headerTitleRow}>
        <Text style={styles.headerTitle}>DASHBOARD - SECRETARY</Text>
      </View>
      <View style={styles.headerSubTitleRow}>
        <Text style={styles.headerSubTitle}>Task View</Text>
      </View>
      {getView()}
    </ScrollView>
  );
};

export default SecretaryDashboard;
