import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StatusBar,
  ToastAndroid,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import styles from './styles';
import firebase from 'react-native-firebase';
import { DailyItems, WeeklyItems, MonthlyItems } from '../../model/model';
const db = firebase.firestore();

const Login = ({ navigation }) => {

  const _storeData = async (v) => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('ecarma_user_mobile_no', v);
    } catch (error) {
      console.log(error)
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('ecarma_user_mobile_no');
      if (value !== null) {
        // We have data!!
        setMobileNo(value)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const appModel = navigation.getScreenProps();

  const [mobileNo, setMobileNo] = React.useState("")
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
    else if (mobileNo.length > 10 || mobileNo.length < 10) {
      ToastAndroid.show('Invalid mobile no', ToastAndroid.SHORT);
      return;
    }

    let v = pwd.reduce(((a, c) => a + c), '');
    _storeData(mobileNo);
    db.collection('users').where('mobileNo', '==', mobileNo).get()
      .then(snapshot => {
        if (snapshot.empty) {
          ToastAndroid.show('Invalid authentication', ToastAndroid.SHORT);
          return;
        }
        snapshot.forEach(doc => {
          let d = doc.data();
          if (d.password !== v) {
            ToastAndroid.show('Invalid password', ToastAndroid.SHORT);
          }
          else {
            d.id = doc.id;
            appModel.login(d);
            if (appModel.isSecretary()) {
              navigation.navigate('secretary_dashboard');
            } else if (appModel.isManager()) {
              navigation.navigate('manager_dashboard');
            }
          }
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  };

  React.useEffect(() => {
    _retrieveData();
  }, []);

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
            placeholder="Mobile No."
            keyboardType="numeric"
            value={mobileNo}
            onChangeText={(v) => setMobileNo(v)}
            style={styles.txtMobileNo}
          />
        </View>
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
          <Text style={styles.versionDetail}>version 0.1.8</Text>
        </View>
      </View>
    </View>
  );
};
export default Login;
