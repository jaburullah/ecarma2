import React from 'react';
import { View, Text, Image, Picker, TouchableOpacity, Modal, TouchableHighlight, Alert, ToastAndroid, Button, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

import { TransitionView } from "../TransitionView";

import styles from './styles';
const ListItem = ({ appModel, data, updateCallBack, index, showDescriptionDialog }) => {

  const [status, changeStatus] = React.useState(data.status);
  const [review, changeReview] = React.useState(data.review);
  const [modalVisible, changeModalVisible] = React.useState(false);
  const [modalDesVisible, changeModalDesVisible] = React.useState(false);
  const updateStatus = v => {

    changeStatus(v);
    let d = { ...data };
    d.status = v;
    updateCallBack(d);
  };

  const getManagerSmiley = () => {
    if (review === 'happy') {
      return (
        <Image
          source={require(`../../assets/happy_smiley.png`)}
          style={styles.listSmiley}
        />
      );
    } else if (review === 'normal') {
      return (
        <Image
          source={require(`../../assets/normal_smiley.png`)}
          style={styles.listSmiley}
        />
      );
    } else if (review === 'sad') {
      return (
        <Image
          source={require(`../../assets/sad_smiley.png`)}
          style={styles.listSmiley}
        />
      );
    }
  };


  const getIcon = () => {
    if (review) {
      return (<Icon
        key={'search'}
        style={{ paddingRight: 10 }}
        name="md-star"
        color={"#bdbdbd"}
        size={30} />);
    }
    return (<Icon
      key={'search'}
      style={{ paddingRight: 10 }}
      name="md-star-half"
      color={"#000"}
      size={30} />);
  }

  return (
    <TransitionView index={index} style={styles.listParentContainer} animation="fadeInRight">
      <TouchableOpacity onPress={() => {
        if (showDescriptionDialog) {
          changeModalDesVisible(true);
        }
      }} style={styles.listTouchContainer}>

        <Dialog height={0.5}
          dialogTitle={<DialogTitle title="Description" />}
          visible={modalDesVisible}
          onTouchOutside={() => {
            changeModalDesVisible(false);
          }}
        >
          <DialogContent>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 3 }}>
                <ScrollView style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text>{data.description || 'No description given'}</Text>
                  </View>
                </ScrollView>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Close"
                  color="#DCA50F"
                  onPress={() => {
                    changeModalDesVisible(false);
                  }}
                />
              </View>
            </View>
          </DialogContent>
        </Dialog>


        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>{data.title}</Text>
          </View>
          <View style={styles.listContent}>
            <View style={styles.listStatusText}>
              {(appModel.isSecretary() && <Text>{data.status}</Text>) || (
                <Picker
                  selectedValue={status}
                  onValueChange={updateStatus}
                  underlineColorAndroid="black">
                  <Picker.Item key={'open'} label={'Open'} value={'Open'} />
                  <Picker.Item key={'in_progress'} label={'In progress'} value={'In progress'} />
                  <Picker.Item key={'completed'} label={'Completed'} value={'Completed'} />
                </Picker>
              )}
            </View>
            <View style={styles.listSmileyParentContainer}>
              {(appModel.isSecretary() && (
                <View style={styles.listSmileyContainer}>
                  <Dialog
                    dialogTitle={<DialogTitle title="Feedback" />}
                    visible={modalVisible}
                    onTouchOutside={() => {
                      changeModalVisible(false);
                    }}
                  >
                    <DialogContent>
                      <View style={styles.dialogTitleText}>
                        <Text style={styles.listHeaderTitle}>{data.title}</Text>
                      </View>
                      <View style={styles.listSmileyContainer}>
                        <View style={styles.listSmileyEachContainer}>
                          <View
                            style={
                              (review === 'happy' && styles.listSmileySelected) ||
                              styles.listSmileyNotSelected
                            }>
                            <TouchableOpacity
                              onPress={() => {
                                changeReview('happy');
                                let d = { ...data }
                                d.review = 'happy';
                                updateCallBack(d);
                              }}>
                              <Image
                                source={require('../../assets/happy_smiley.png')}
                                style={styles.listSmiley}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.listSmileyEachContainer}>
                          <View
                            style={
                              (review === 'normal' && styles.listSmileySelected) ||
                              styles.listSmileyNotSelected
                            }>
                            <TouchableOpacity
                              onPress={() => {
                                changeReview('normal');
                                let d = { ...data }
                                d.review = 'normal';
                                updateCallBack(d);
                              }}>
                              <Image
                                source={require('../../assets/normal_smiley.png')}
                                style={styles.listSmiley}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.listSmileyEachContainer}>
                          <View
                            style={
                              (review === 'sad' && styles.listSmileySelected) ||
                              styles.listSmileyNotSelected
                            }>
                            <TouchableOpacity
                              onPress={() => {
                                changeReview('sad');
                                let d = { ...data }
                                d.review = 'sad';
                                updateCallBack(d);
                              }}>
                              <Image
                                source={require('../../assets/sad_smiley.png')}
                                style={styles.listSmiley}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </DialogContent>
                  </Dialog>
                  <View style={styles.listSmileyEachContainer}>
                    <View
                      style={
                        styles.listSmileyNotSelected

                      }>
                      {
                        (status === 'Completed') &&
                        (<TouchableOpacity
                          onPress={() => {
                            if (review) {
                              ToastAndroid.show('Feedback has given', ToastAndroid.SHORT);
                              return;
                            }
                            changeModalVisible(true)
                          }}>
                          {getIcon()}
                        </TouchableOpacity>)
                      }
                    </View>
                  </View>
                </View>
              )) || (
                  <View style={styles.listSmileyContainer}>
                    {(!review && (
                      <View
                        style={[
                          styles.listSmileyEachContainer,
                          styles.listSmileyEmpty,
                        ]}
                      />
                    )) || (
                        <View style={styles.listSmileyEachContainer}>
                          {getManagerSmiley()}
                        </View>
                      )}
                  </View>
                )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </TransitionView>
  );
};

export default ListItem;
