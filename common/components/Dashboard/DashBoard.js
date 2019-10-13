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

function separateTickets(data, type) {
    let sadTickets = [];
    let normalTickets = [];
    let happyTickets = [];
    let noReview = [];
    data.forEach(o => {
        let d = o.data();
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
    });

    let totalCount =
        sadTickets.length + normalTickets.length + happyTickets.length;
    let allCount = data.length;
    let m = {
        name: type,
        title: type.toUpperCase(),
        openTicketCount: numLengthCheck(noReview.length),
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
            isLoading: true
        });

        const db = firebase.firestore();
        const ticketsRef = db.collection('tickets');
        const dailyTasksRef = db.collection('dailyTasks');
        const weeklyTasksRef = db.collection('weeklyTasks');
        const monthlyTasksRef = db.collection('monthlyTasks');

        Promise.all([ticketsRef.get(), dailyTasksRef.get(), weeklyTasksRef.get(), monthlyTasksRef.get()])
            .then((data) => {
                const titles = ['tickets', 'daily', 'weekly', 'monthly']
                let dd = data.map((d, i) => {
                    return separateTickets(d._docs, titles[i]);
                });
                setState(c => ({ tickets: dd, isLoading: false }));
            })
            .catch(e => console.log(e));

        return (<C {...props} state={state} />);

    }
};

export default Dashboard;