import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ToastAndroid,
    AsyncStorage,
    ScrollView
} from 'react-native';
import firebase from 'react-native-firebase';
import styles from './styles';
const db = firebase.firestore();
const usersRef = db.collection('users');
const UserProfile = ({ navigation }) => {

    const appModel = navigation.getScreenProps();
    const initialState = {
        mobileNo: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    const [state, setState] = React.useState(initialState)

    const _storeData = async (v) => {
        try {
            await AsyncStorage.clear();
            await AsyncStorage.setItem('ecarma_user_mobile_no', v);
        } catch (error) {
            console.log(error)
        }
    };
    const getData = async () => {
        // try {
        //     const value = await AsyncStorage.getItem('ecarma_user_mobile_no');
        //     if (value !== null) {
        //         onChangeMobileNo(value)
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
        const curUser = appModel.getUser();
        onChangeMobileNo(curUser.mobileNo)
    }


    React.useEffect(() => {
        getData();
    }, [])

    const onChangeMobileNo = (v) => {
        setState((c) => {
            return {
                ...c,
                mobileNo: v
            }
        })
    }

    const onChangeOldPassword = (v) => {
        setState((c) => {
            return {
                ...c,
                oldPassword: v
            }
        })
    }


    const onChangeNewPassword = (v) => {
        setState((c) => {
            return {
                ...c,
                newPassword: v
            }
        })
    }

    const onChangeConfirmPassword = (v) => {
        setState((c) => {
            return {
                ...c,
                confirmPassword: v
            }
        })
    }

    const onUpdateUserProfile = async () => {

        const user = appModel.getUser();
        if (!state.mobileNo) {
            ToastAndroid.show("Ender mobile no.", ToastAndroid.SHORT)
        }
        else if (!state.oldPassword) {
            ToastAndroid.show("Ender old password", ToastAndroid.SHORT)
        }
        else if (!state.newPassword) {
            ToastAndroid.show("Ender new password", ToastAndroid.SHORT)
        }
        else if (!state.confirmPassword) {
            ToastAndroid.show("Ender confirm password", ToastAndroid.SHORT)
        }
        else if (state.oldPassword.length > 4 || state.oldPassword.length < 4) {
            ToastAndroid.show("Old password should have 4 numbers", ToastAndroid.SHORT)
        }
        else if (state.oldPassword !== user.password) {
            ToastAndroid.show("You have entered wrong old password", ToastAndroid.SHORT)
        }
        else if (state.newPassword.length > 4 || state.newPassword.length < 4) {
            ToastAndroid.show("New password should have 4 numbers", ToastAndroid.SHORT)
        }
        else if (state.confirmPassword.length > 4 || state.confirmPassword.length < 4) {
            ToastAndroid.show("Confirm password should have 4 numbers", ToastAndroid.SHORT)
        }
        else if (state.confirmPassword !== state.newPassword) {
            ToastAndroid.show("Confirm and New password should match", ToastAndroid.SHORT)
        } else {
            const updateUser = { ...user }
            updateUser.password = state.newPassword;
            updateUser.mobileNo = state.mobileNo;


            usersRef.where('mobileNo', '==', updateUser.mobileNo).get().then(data => {
                if (data.docs.length && data.docs[0].id !== updateUser.userID) { //if (data.docs.length && req.body.userID !== data.docs[0].id) {
                    ToastAndroid.show("Mobile number already exists", ToastAndroid.SHORT);
                    throw "error: Mobile number already exists"
                }
                else {
                    return usersRef.doc(`${updateUser.userID}`)
                        .get()
                }
            })
                .then((doc) => {
                    if (!doc.exists) {
                        console.log({ error: 'User not found' });
                    }
                    delete updateUser.userID;
                    _storeData(updateUser.mobileNo);
                    return doc.ref.update({ ...updateUser })
                })
                .then(data => {
                    //setState(initialState)
                    ToastAndroid.show("Updated successfully", ToastAndroid.SHORT);
                })
                .catch((err) => {
                    console.log(err);
                });
        }



    }

    return <ScrollView style={styles.parentContainer}>
        <View style={styles.parentContainer}>
            <View style={styles.container}>
                <View style={styles.rowStyle1}>
                    <Text style={styles.headerTitle}>User Profile</Text>
                </View>
                <View style={styles.rowStyle2}>
                    <TextInput style={styles.textInputStyle} value={state.mobileNo} name="mobileNo" onChangeText={onChangeMobileNo} placeholder="Mobile No." keyboardType="number-pad" ></TextInput>
                    <TextInput style={styles.textInputStyle} secureTextEntry={true} value={state.oldPassword} onChangeText={onChangeOldPassword} placeholder="Old Password" keyboardType="number-pad" ></TextInput>
                    <TextInput style={styles.textInputStyle} secureTextEntry={true} value={state.newPassword} onChangeText={onChangeNewPassword} placeholder="New Password" keyboardType="number-pad" ></TextInput>
                    <TextInput style={styles.textInputStyle} secureTextEntry={true} value={state.confirmPassword} onChangeText={onChangeConfirmPassword} placeholder="Confirm Password" keyboardType="number-pad" ></TextInput>
                </View>
                <View style={styles.rowStyle3}>
                    <Button title="Update" color="#DCA50F" onPress={onUpdateUserProfile} />
                </View>
            </View>
        </View>
    </ScrollView>

}


export default UserProfile;