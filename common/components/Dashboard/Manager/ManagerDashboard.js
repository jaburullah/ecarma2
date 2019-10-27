import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import styles from './styles';
import Dashboard from '../DashBoard';

const ManagerDashboard = ({ navigation, state }) => {

  const onTouchTask = (type) => {
    if (type === 'ticket') {
      navigation.navigate(`manager_ticket_view`);
      return;
    }
    navigation.navigate(`manager_task_view`);
  };

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
              <TouchableOpacity onPress={() => { onTouchTask(i === 0 ? 'ticket' : 'task') }}>
                <View style={styles.taskCount}>
                  <Text style={styles.taskTextTitle}>OPEN {i === 0 ? 'TICKET' : 'TASK'}</Text>
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
        <Text style={styles.headerTitle}>DASHBOARD - MANAGER</Text>
      </View>
      <View style={styles.headerSubTitleRow}>
        <Text style={styles.headerSubTitle}>Task View</Text>
      </View>
      {getView()}
    </ScrollView>
  );
};

export default Dashboard(ManagerDashboard);
