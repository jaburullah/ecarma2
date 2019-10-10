import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import firebase from 'react-native-firebase';

function numLengthCheck(num) {
  num = num + '';
  num = num.length >= 2 ? num : '0' + num;
  return num;
}

function calculatePercentage(ticketCount, totalTicketCount) {
  return Math.floor(ticketCount / totalTicketCount * 100);
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

const ManagerDashboard = ({ navigation }) => {
  const appModel = navigation.getScreenProps();
  const onTouchTask = () => {
    navigation.navigate('manager_task_view');
  };
  const [tickets, setTickets] = React.useState([{}, {}, {}]);

  const [isDailyLoading, setDailyLoading] = React.useState(true);
  const [isWeeklyLoading, setWeeklyLoading] = React.useState(true);
  const [isMonthlyLoading, setMonthlyLoading] = React.useState(true);

  const dailyTickets = firebase.firestore().collection('dailyTickets');
  const weeklyTickets = firebase.firestore().collection('weeklyTickets');
  const monthlyTickets = firebase.firestore().collection('monthlyTickets');

  dailyTickets
    .get()
    .then(data => {
      if (isDailyLoading) {
        tickets[0] = separateTickets(data.docs, 'daily');
        setTickets([...tickets]);
        setDailyLoading(false);
      }
    })
    .catch(e => console.log(e));

  weeklyTickets
    .get()
    .then(data => {
      if (isWeeklyLoading) {
        console.log('weeklyTickets', tickets);
        tickets[1] = separateTickets(data.docs, 'weekly');
        setTickets([...tickets]);
        setWeeklyLoading(false);
      }
    })
    .catch(e => console.log(e));

  monthlyTickets
    .get()
    .then(data => {
      if (isMonthlyLoading) {
        tickets[2] = separateTickets(data.docs, 'monthly');
        setTickets([...tickets]);
        setMonthlyLoading(false);
      }
    })
    .catch(e => console.log(e));

  const showSmiley = (o) => {
    console.log('showSmiley', o)
    if (o.max === 'happy' || true) {
      return (<View style={[styles.taskSmileyContainer]}>
        <Image
          style={styles.taskSmiley}
          source={require('../../../assets/happy_smiley_big.png')}
        />
        <Text style={styles.taskSmileyText}>{o.happyPercent}%</Text>
      </View>)
    }
    // else if (o.max === 'normal') {
    //   return (<View style={[styles.taskSmileyContainer]}>
    //     <Image
    //       style={styles.taskSmiley}
    //       source={require('../../../assets/normal_smiley.png')}
    //     />
    //     <Text style={styles.taskSmileyText}>{o.normalPercent}%</Text>
    //   </View>)
    // }
    // else if (o.max === 'sad') {
    //   return (<View style={[styles.taskSmileyContainer]}>
    //     <Image
    //       style={styles.taskSmiley}
    //       source={require('../../../assets/sad_smiley.png')}
    //     />
    //     <Text style={styles.taskSmileyText}>{o.sadPercent}%</Text>
    //   </View>)
    // }
  }

  const getView = () => {
    if (isDailyLoading || isWeeklyLoading || isMonthlyLoading) {
      return (
        <View style={styles.taskLodingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return tickets.map((o, i) => {
        return (
          <View key={o.name} style={styles.taskContainer}>
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
    <View style={styles.parent}>
      <View style={styles.headerTitleRow}>
        <Text style={styles.headerTitle}>DASHBOARD</Text>
      </View>
      <View style={styles.headerSubTitleRow}>
        <Text style={styles.headerSubTitle}>Task View</Text>
      </View>
      {getView()}
    </View>
  );
};

export default ManagerDashboard;
