
import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase'
const ManagerApartmentInfo = (C) => {
    return (props) => {
        const [state, setState] = React.useState({ isLoading: true, apartments: [] })
        const appModel = props.navigation.getScreenProps();
        const apartmentsID = appModel.getApartmentsID();
        const apartmentRef = firebase.firestore().collection('apartments');
        const apartmentsIDDocs = apartmentsID.map(v => apartmentRef.doc(v).get());

        const getTabs = () => {
            Promise.all(apartmentsIDDocs).then((docs) => {
                const apartments = docs.map(document => { let data = document.data(); data.id = document.id; return data; });
                appModel.setApartments(apartments)
                setState(c => ({ isLoading: false, apartments }));
            }).catch(e => console.log(e));
        };

        React.useEffect(() => {
            getTabs();
        }, []);

        return state.isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View> : (<C {...props} apartments={state.apartments} />)

    }
}

export default ManagerApartmentInfo;