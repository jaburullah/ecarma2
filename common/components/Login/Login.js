import React, { Fragment } from 'react';
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
import { DailyItems, WeeklyItems, MonthlyItems } from '../../model/model';

const Login = ({ navigation }) => {
  const appModel = navigation.getScreenProps();
  const usersRef = firebase.firestore().collection('users');

  // const db = firebase.firestore();
  // let batch = db.batch();
  // db.collection('dailyTasks').get().then(doc => {
  //   doc.forEach(d => {
  //     const dailyTask = db.doc(`dailyTasks/${d.id}`);
  //     batch.update(dailyTask, { review: "", status: "Open", modifiedDate: new Date() })
  //   }
  //   );
  //   return batch
  //     .commit();
  //   //return res.json(doc);
  // })
  //   .then(() => {
  //     console.log('Daily Tasks Updated Successfully');
  //     //return res.json({ message: 'Notifications marked read' });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     //return res.status(500).json({ error: err.code });
  //   });


  // const apartmentRef = firebase.firestore().collection('apartments');
  // const dailyTasksRef = firebase.firestore().collection('dailyTasks');
  // const weeklyTasksRef = firebase.firestore().collection('weeklyTasks');
  // const monthlyTasksRef = firebase.firestore().collection('monthlyTasks');

  // apartmentRef.get().then(docs => {
  //   docs.forEach(doc => {
  //     DailyItems.forEach((v) => {
  //       v.apartmentID = doc.id;

  //       dailyTasksRef.add(v);
  //     });

  //     WeeklyItems.forEach((v) => {
  //       v.apartmentID = doc.id;
  //       weeklyTasksRef.add(v);
  //     });

  //     MonthlyItems.forEach((v) => {
  //       v.apartmentID = doc.id;
  //       monthlyTasksRef.add(v);
  //     });
  //     console.log(DailyItems, WeeklyItems, MonthlyItems);
  //   });


  // }).catch(e => console.log(e));





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
    pwd[me] = val;
    if (me === '0' && val) {
      refSecondDigit.current.focus();
    } else if (me === '1' && val) {
      refThirdDigit.current.focus();
    } else if (me === '2' && val) {
      refFourthDigit.current.focus();
    } else if (me === '3' && val) {
      refFourthDigit.current.focus();
    }

    if (pwd.indexOf('') >= 0) {
      return;
    }

    let v = pwd.reduce(((a, c) => a + c), '');

    let query = usersRef.where('password', '==', v).get()
      .then(snapshot => {
        if (snapshot.empty) {
          ToastAndroid.show('Invalid authentication', ToastAndroid.SHORT);
          return;
        }

        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          let d = doc.data();
          d.id = doc.id;
          appModel.login(d);

          if (appModel.isSecretary()) {
            // firebase
            //   .auth()
            //   .signInAnonymously()
            //   .then(() => {
            //     console.log('login');
            //   })
            //   .catch(error => console.log(error));
            navigation.navigate('secretary_dashboard');
          } else if (appModel.isManager()) {
            navigation.navigate('manager_dashboard');
          }
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

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
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </View>
        <View style={styles.versionDetailContainer}>
          <Text style={styles.versionDetail}>version 0.1.7</Text>
        </View>
      </View>
    </View>
  );
};
export default Login;
