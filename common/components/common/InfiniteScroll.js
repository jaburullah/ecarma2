import React from 'react';
import firebase from 'react-native-firebase';
const InfiniteScroll = (C, options = { limit: 10, collection: null }) => {
    return (props) => {
        const database = firebase.firestore();

        const [state, setState] = React.useState({
            data: [],
            limit: options.limit,
            lastDoc: null,
            isLoading: true,
            isRefreshing: false
        });


        // Retrieve Data
        const retrieveData = async () => {
            try {
                setState(c => ({ ...c, isLoading: true }));
                console.log('Retrieving Data');
                // Cloud Firestore: Query
                let initialQuery = await database.collection(options.collection)
                    // .where('id', '<=', 20)
                    .orderBy('modifiedDate', 'DESC')
                    .limit(state.limit)
                // Cloud Firestore: Query Snapshot
                let documentSnapshots = await initialQuery.get();
                // Cloud Firestore: Document Data
                let documentData = documentSnapshots.docs.map(document => { let data = document.data(); return { ...data, id: document.id }; });
                console.log(documentData, state.dataItem);
                // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
                let lastDoc = documentData[documentData.length - 1];
                // Set State

                setState(c => ({ ...c, data: documentData, lastDoc, isLoading: false }));
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

                console.log(state.data.length);
                console.log('Retrieving additional Data');
                // Cloud Firestore: Query (Additional Query)
                let additionalQuery = await database.collection(options.collection)
                    // .where('id', '<=', 20)
                    .orderBy('modifiedDate', 'DESC')
                    .startAfter(state.lastDoc.modifiedDate)
                    .limit(state.limit)
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

        React.useEffect(() => {
            retrieveData();
        }, []);

        return (< C {...props}
            data={state.data}
            isLoading={state.isLoading}
            isRefreshing={state.isRefreshing}
            retrieveMore={retrieveMore} />)
    };
}

export default InfiniteScroll;