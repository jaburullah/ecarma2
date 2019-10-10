import React, {Fragment} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import firebase from 'react-native-firebase';
import {DailyItems, WeeklyItems, MonthlyItems} from '../../model/model';

const Login = ({navigation}) => {
  const appModel = navigation.getScreenProps();
  // const dailyTickets = firebase.firestore().collection('dailyTickets');
  // const weeklyTickets = firebase.firestore().collection('weeklyTickets');
  // const monthlyTickets = firebase.firestore().collection('monthlyTickets');

  // DailyItems.forEach((o, i) => {
  //   dailyTickets.add(o);
  // });
  // WeeklyItems.forEach((o, i) => {
  //   weeklyTickets.add(o);
  // });
  // MonthlyItems.forEach((o, i) => {
  //   monthlyTickets.add(o);
  // });

  // dailyTickets
  //   .get()
  //   .then(doc => {
  //     console.log(doc, doc._docs[0].data());
  //   })
  //   .catch(e => console.log(e));

  // weeklyTickets
  //   .get()
  //   .then(doc => {
  //     console.log(doc, doc._docs[0].data());
  //   })
  //   .catch(e => console.log(e));

  // monthlyTickets
    // .get()
    // .then(doc => {
    //   console.log(doc, doc._docs[0].data());
    // })
    // .catch(e => console.log(e));

  const refFirstDigit = React.useRef(),
    refSecondDigit = React.useRef(),
    refThirdDigit = React.useRef(),
    refFourthDigit = React.useRef();
  let pwd = ['', '', '', ''];
  const onPasswordChange = (me, val) => {
    pwd[me] = +val;
    if (me === '0' && val) {
      refSecondDigit.current.focus();
    } else if (me === '1' && val) {
      refThirdDigit.current.focus();
    } else if (me === '2' && val) {
      refFourthDigit.current.focus();
    } else if (me === '3' && val) {
      refFourthDigit.current.focus();
    }
    if (pwd[0] === 1 && pwd[1] === 2 && pwd[2] === 3 && pwd[3] === 4) {
      appModel.login({roles: ['secretary']});
      if (appModel.isSecretary()) {
        firebase
          .auth()
          .signInAnonymously()
          .then(() => {
            console.log('login');
          })
          .catch(error => console.log(error));
        navigation.navigate('secretary_dashboard');
      } else {
        ToastAndroid.show('Invalid authentication', ToastAndroid.SHORT);
      }
    } else if (pwd[0] === 1 && pwd[1] === 2 && pwd[2] === 3 && pwd[3] === 5) {
      appModel.login({roles: ['manager']});
      if (appModel.isManager()) {
        navigation.navigate('manager_dashboard');
      } else {
        ToastAndroid.show('Invalid authentication', ToastAndroid.SHORT);
      }
    } else if (pwd[0] && pwd[1] && pwd[2] && pwd[3]) {
      ToastAndroid.show('Invalid password', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoSize}
          source={require('../../assets/app_logo.png')}
        />
      </View>
      <View style={styles.inputParentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={refFirstDigit}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={val => {
              onPasswordChange('0', val);
            }}
            secureTextEntry={true}
            style={styles.txtPassword}
          />
          <TextInput
            ref={refSecondDigit}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={val => {
              onPasswordChange('1', val);
            }}
            secureTextEntry={true}
            style={styles.txtPassword}
          />
          <TextInput
            ref={refThirdDigit}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={val => {
              onPasswordChange('2', val);
            }}
            secureTextEntry={true}
            style={styles.txtPassword}
          />
          <TextInput
            ref={refFourthDigit}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={val => {
              onPasswordChange('3', val);
            }}
            secureTextEntry={true}
            style={styles.txtPassword}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgor Password ?</Text>
        </View>
      </View>
    </View>
  );
};
export default Login;
