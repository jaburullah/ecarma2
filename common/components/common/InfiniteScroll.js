import React from 'react';
import firebase from 'react-native-firebase';
const InfiniteScroll = (C, options = { limit: 10, collection: null }) => {
    return (props) => {
        const appModel = props.navigation.getScreenProps();
        const database = firebase.firestore();

        const [state, setState] = React.useState({
            data: [],
            limit: options.limit,
            lastDoc: null,
            isLoading: true,
            isRefreshing: false,
            count: 0,
        });


        // Retrieve Data
        const retrieveData = async () => {
            console.log('retrieveData');
            try {
                setState(c => ({ ...c, isLoading: true }));

                const promiseData = Promise.all(database.collection(options.collection).where('apartmentID', '==', appModel.apartmentID).get());
                let dd = [];
                promiseData.then(data => {

                    data.forEach(d => {
                        d.docs.forEach(v => {
                            let data = v.data();
                            dd.push({ ...data, id: v.id });
                        });
                    })
                    let lastDoc = dd[dd.length - 1];
                    setState(c => ({ ...c, data: dd, lastDoc, isLoading: false }));

                }).catch(e => console.log(e));


                // Cloud Firestore: Query
                // let initialQuery = await database.collection(options.collection)
                //     .where('apartmentID', '==', appModel.apartmentID)
                // .orderBy('modifiedDate', 'DESC')
                // .limit(state.limit)

                // Cloud Firestore: Query Snapshot
                // let documentSnapshots = await initialQuery.get();
                // Cloud Firestore: Document Data
                // let documentData = documentSnapshots.docs.map(document => { let data = document.data(); return { ...data, id: document.id }; });
                // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
                // let lastDoc = documentData[documentData.length - 1];
                // Set State

                // setState(c => ({ ...c, data: documentData, lastDoc, isLoading: false }));
            }
            catch (error) {
                console.log(error);
            }
        };

        // Retrieve More
        const retrieveMore = async () => {
            try {
                // Set State: Refreshing
                setState(c => ({ ...c, isRefreshing: true }));

                // Cloud Firestore: Query (Additional Query)
                let additionalQuery = await database.collection(options.collection)
                    .where('apartmentID', '==', appModel.apartmentID)
                // .orderBy('modifiedDate', 'DESC')
                // .startAfter(state.lastDoc.modifiedDate)
                // .limit(state.limit)

                // Cloud Firestore: Query Snapshot
                let documentSnapshots = await additionalQuery.get();
                // Cloud Firestore: Document Data
                let documentData = documentSnapshots.docs.map(document => { let data = document.data(); return { ...data, id: document.id }; });
                // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
                if (documentData.length) {
                    let lastDoc = documentData[documentData.length - 1];

                    setState(c => ({ ...c, data: [...c.data, ...documentData], lastDoc, isRefreshing: false }));
                }


            }
            catch (error) {
                console.log(error);
            }
        };


        const setUp = () => {
            let cachedData = [];
            if (options.collection === 'dailyTasks') {
                cachedData = appModel.getApartmentDailyTasks(appModel.apartmentID);
            }
            else if (options.collection === 'monthlyTasks') {
                cachedData = appModel.getApartmentMonthlyTasks(appModel.apartmentID);
            }
            else if (options.collection === 'weeklyTasks') {
                cachedData = appModel.getApartmentWeeklyTasks(appModel.apartmentID);
            }
            else if (options.collection === 'tickets') {
                cachedData = appModel.getApartmentTickets(appModel.apartmentID);
            }

            if (cachedData && cachedData.length) {
                let lastDoc = cachedData[cachedData.length - 1];
                setState(c => ({ ...c, data: cachedData, lastDoc, isLoading: false }));
            }
            else {
                retrieveData();
            }
        }

        const CB = () => {
            setState(c => ({ ...c, count: c.count + 1 }));
        }

        React.useEffect(() => {
            setUp();
        }, [state.count])

        return (< C {...props}
            data={state.data}
            isLoading={state.isLoading}
            isRefreshing={state.isRefreshing}
            retrieveMore={retrieveMore} CB={CB} />)
    };
}

export default InfiniteScroll;