import firebase from 'react-native-firebase';
import React from 'react';

function numLengthCheck(num) {
    num = num + '';
    num = num.length >= 2 ? num : '0' + num;
    return num;
}

function calculatePercentage(ticketCount, totalTicketCount) {
    let s = Math.floor(ticketCount / totalTicketCount * 100)
    return isNaN(s) ? 0 : s;
}

function separateTickets(data, type, appModel) {
    let sadTickets = [];
    let normalTickets = [];
    let happyTickets = [];
    let noReview = [];
    let openTickets = [];
    data.forEach(o => {
        let d = o.data();
        d.id = o.id


        if (d.review === 'happy') {
            happyTickets.push(d);
        } else if (d.review === 'normal') {
            normalTickets.push(d);
        } else if (d.review === 'sad') {
            sadTickets.push(d);
        }
        else {
            noReview.push(d);
        }


        if (d.status === 'Open') {
            openTickets.push(d);
        }
    });

    //['tickets', 'daily', 'weekly', 'monthly']
    let d = happyTickets.concat(normalTickets).concat(sadTickets).concat(noReview);
    if (type === 'tickets') {
        appModel.setApartmentTickets(d);
    }
    else if (type === 'daily') {
        appModel.setApartmentDailyTasks(d);
    }
    else if (type === 'weekly') {
        appModel.setApartmentWeeklyTasks(d);
    }
    else if (type === 'monthly') {
        appModel.setApartmentMonthlyTasks(d);
    }

    let totalCount =
        sadTickets.length + normalTickets.length + happyTickets.length;
    let allCount = data.length;
    let m = {
        name: type,
        title: type.toUpperCase(),
        openTicketCount: numLengthCheck(openTickets.length),
        happyPercent: numLengthCheck(
            calculatePercentage(happyTickets.length, totalCount),
        ),
        normalPercent: numLengthCheck(
            calculatePercentage(normalTickets.length, totalCount),
        ),
        sadPercent: numLengthCheck(
            calculatePercentage(sadTickets.length, totalCount),
        ),
    };

    let s = [+m.happyPercent, +m.normalPercent, +m.sadPercent]
    let maxS = Math.max(...s);
    if (maxS === +m.happyPercent) {
        m.max = 'happy'
    }
    else if (maxS === +m.normalPercent) {
        m.max = 'normal'
    }
    else if (maxS === +m.sadPercent) {
        m.max = 'sad'
    }
    return m;
}

const Dashboard = (C) => {
    return (props) => {

        const [state, setState] = React.useState({
            tickets: [],
            isLoading: true,
            apartmentInfo: [],
            count: 0
        });



        // props.navigation.addListener('didFocus', () => {
        //     setState(c => ({ ...c, isLoading: true, count: c.count + 1 }));
        // });


        const getData = () => {
            const appModel = props.navigation.getScreenProps();
            const apartmentsID = appModel.getApartmentsID();

            const db = firebase.firestore();


            // db.collection('tickets').where('apartmentID', '==', apartmentsID[0]).onSnapshot(snapshot => {
            //     console.log(snapshot.docChanges);
            // })


            const mapAppTickets = apartmentsID.map(v => db.collection('tickets').where('apartmentID', '==', v).get()) //.orderBy('modifiedDate', 'DESC')
            const mapAppDaily = apartmentsID.map(v => db.collection('dailyTasks').where('apartmentID', '==', v).get())
            const mapAppWeekly = apartmentsID.map(v => db.collection('weeklyTasks').where('apartmentID', '==', v).get())
            const mapAppMonth = apartmentsID.map(v => db.collection('monthlyTasks').where('apartmentID', '==', v).get())

            let pT = Promise.all(mapAppTickets);
            let pD = Promise.all(mapAppDaily);
            let pW = Promise.all(mapAppWeekly);
            let pM = Promise.all(mapAppMonth);

            const mapApartments = apartmentsID.map(v => db.collection('apartments').doc(v).get())

            let pA = Promise.all(mapApartments);

            Promise.all([pT, pD, pW, pM, pA]).then((data) => {

                let d = [[], [], [], []]
                for (let i = 0; i < data.length - 1; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        let docs = data[i][j]._docs
                        for (let k = 0; k < docs.length; k++) {
                            d[i].push(docs[k]);
                        }
                    }
                }

                const titles = ['tickets', 'daily', 'weekly', 'monthly']
                let dd = d.map((d, i) => {
                    return separateTickets(d, titles[i], appModel);
                });
                let ap = data[data.length - 1];
                let apName = ap.map(doc => doc.data().name)

                setState(c => ({ tickets: dd, isLoading: false, apartmentInfo: apName }));
            }).catch(e => console.log(e));

        }



        React.useEffect(() => {
            props.navigation.addListener('didFocus', () => {
                getData();
            });
        }, [])


        return (<C {...props} state={state} />);

    }
};

export default Dashboard;