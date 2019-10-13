import React from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { DailyItems, WeeklyItems, MonthlyItems } from '../../../model/model';


import firebase from 'react-native-firebase';

const CreateTicket = ({ navigation }) => {
  model = navigation.getScreenProps();
  const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    // storageOptions: {
    //   skipBackup: true,
    //   path: 'images',
    // },
  };
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [categoryList, changeCategoryList] = React.useState(DailyItems);
  const [period, setPeriod] = React.useState([
    {
      name: 'daily',
      label: 'Daily',
      isChecked: true,
    },

    {
      name: 'weekly',
      label: 'Weekly',
      isChecked: false,
    },

    {
      name: 'monthly',
      label: 'Monthly',
      isChecked: false,
    },
  ]);
  const [selectedPeriod, setSelectedPeriod] = React.useState('daily')
  const onChangePeriod = c => {
    let curPeriod = [...period];
    curPeriod = curPeriod.map((o, i) => {
      o.isChecked = false;
      if (c.name === o.name) {
        o.isChecked = true;
      }
      return o;
    });
    setPeriod(curPeriod);
    setSelectedPeriod(c.name);
    if (c.name === 'daily') {
      changeCategoryList(DailyItems);
      // setCategory(DailyItems[0].name);
    } else if (c.name === 'weekly') {
      changeCategoryList(WeeklyItems);
      // setCategory(WeeklyItems[0].name);
    } else if (c.name === 'monthly') {
      changeCategoryList(MonthlyItems);
      // setCategory(MonthlyItems[0].name);
    }
  };

  const getRadioButton = () => {
    return period.map((o, i) => {
      return (
        <View key={o.name} style={styles.flex1}>
          <TouchableOpacity
            onPress={() => onChangePeriod(o)}
            style={styles.radioButtons}>
            {(o.isChecked && (
              <Icon name="md-radio-button-on" size={30} color={'black'} />
            )) || <Icon name="md-radio-button-off" size={30} color={'black'} />}
            <Text style={styles.radioButtonText}>{o.label}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const updateCategory = v => {
    setCategory(v);
  };

  const selectPhoto = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source);
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  const onCreateTicket = () => {
    onChangePeriod({ name: 'daily' });
    setDescription('');
    let f = categoryList.find((o) => {
      if (category) {
        if (o.name === category) {
          return true;
        }
      }
      else {
        if (o.name === categoryList[0].name) {
          return true;
        }
      }
    });
    // const newTicket = { title: f.title, status: 'Assigned', name: category || categoryList[0].name, description, review: '', userID: 1, createdDate: new Date(), modifiedDate: new Date(), apartmentID: model.getApartmentID() }
    // if (selectedPeriod === 'daily') {
    //   const dailyTickets = firebase.firestore().collection('dailyTasks');
    //   dailyTickets.add(newTicket).then((doc) => {
    //     console.log(doc)

    //   });
    // }
    // else if (selectedPeriod === 'weekly') {
    //   const dailyTickets = firebase.firestore().collection('weeklyTasks');
    //   dailyTickets.add(newTicket).then((doc) => {
    //     console.log(doc)
    //   });
    // }
    // else if (selectedPeriod === 'monthly') {
    //   const dailyTickets = firebase.firestore().collection('monthlyTasks');
    //   dailyTickets.add(newTicket).then((doc) => {
    //     console.log(doc)
    //   });
    // }

    const newTicket = { title: f.title, type: selectedPeriod, status: 'Assigned', name: category || categoryList[0].name, description, review: '', userID: 1, createdDate: new Date(), modifiedDate: new Date(), apartmentID: model.getApartmentID() }
    const ticket = firebase.firestore().collection('tickets');
    ticket.add(newTicket).then((doc) => {
      console.log(doc)
    });

    ToastAndroid.show('Ticket created successfully', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.parentContainer}>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.rowStyle1}>
          <Text style={styles.headerTitle}>Create New Ticket</Text>
        </View>
        <View style={styles.rowStyle1}>
          <Text style={styles.title}>Select Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={updateCategory}
            underlineColorAndroid="black">
            {categoryList.map((o, i) => {
              return (
                <Picker.Item key={o.name} label={o.title} value={o.name} />
              );
            })}
          </Picker>
        </View>
        <View style={[styles.rowStyle1, styles.radioButtonsContainer]}>
          {getRadioButton()}
        </View>
        <View style={styles.rowStyle4}>
          <Text style={[styles.title, styles.magrinBottom10]}>Description</Text>
          <TextInput
            onChangeText={v => {
              setDescription(v);
            }}
            value={description}
            multiline={true}
            textAlignVertical={'top'}
            numberOfLines={8}
            style={styles.textArea}
          />
        </View>
        <View style={styles.rowStyle2}>
          <View style={styles.uploadIconsContainer}>
            <TouchableOpacity onPress={selectPhoto} style={styles.icon1}>
              <Icon name="md-images" size={45} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectPhoto}>
              <Icon name="md-videocam" size={45} color={'black'} />
            </TouchableOpacity>
          </View>
          <View style={styles.uploadTextContainer}>
            <Text style={styles.uploadText}>upload image or video</Text>
          </View>
        </View>
        <View style={styles.rowStyle3}>
          <Button title="Create" color="#DCA50F" onPress={onCreateTicket} />
        </View>
      </View>
    </View>
  );
};

export default CreateTicket;
