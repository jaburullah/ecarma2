import React from 'react';
import { View, Text, Image, Picker, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

import { TransitionView } from "../TransitionView";

import styles from './styles';
const ListItem = ({ appModel, data, updateCallBack, index }) => {
  const [status, changeStatus] = React.useState(data.status);
  const [review, changeReview] = React.useState(data.review);
  const [modalVisible, changeModalVisible] = React.useState(false);
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

  return (
    <TransitionView index={index} style={styles.listParentContainer} animation="fadeInRight">
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
                <Picker.Item key={'in_progress'} label={'In progress'} value={'in_progress'} />
                <Picker.Item key={'completed'} label={'Completed'} value={'in_progress'} />
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
                      (status === 'Closed') &&
                      (<TouchableOpacity
                        onPress={() => {
                          changeModalVisible(true)
                        }}>
                        <Icon
                          key={'search'}
                          style={{ paddingRight: 10 }}
                          name="md-star-half"
                          color="#000"
                          size={30}
                        />
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
    </TransitionView>
  );
};

export default ListItem;
