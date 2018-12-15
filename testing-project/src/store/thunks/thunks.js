import {
    getCompaniesStarted,
    getCompaniesSuccess,
    getTestsStarted,
    getTestsSuccess,
    getUsersStarted,
    getUsersSuccess,

} from '../actions/appAction';
import { firebase } from '../../firebase/firebase';

export const getTests = () => {
    return dispatch => {
        dispatch(getTestsStarted());

        firebase.database().ref('tests').on('value', (snapshot) => {
            let tests = [];
            let passersObj = {};
            let passers = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.hasChild('passers')) {
                    childSnapshot.child('passers').forEach(snapshot1 => {
                        passersObj = {
                            ...passersObj,
                            key: { id: snapshot1.key, ...snapshot1.val() },
                        }

                    })
                } else {
                    passers = [];
                }
                passers = Object.values(passersObj);
                if (childSnapshot.hasChild('passers')) {
                    tests.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                        passers
                    })
                } else {
                    tests.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                    })
                }

            });
            let filteredTests = [];
            tests.sort(function (a, b) { return b.testCreateDate - a.testCreateDate });
            filteredTests = tests.filter(test => !test.deleted)


            dispatch(getTestsSuccess(filteredTests));
        });
    }
};

export const getCompanies = () => {
    return dispatch => {
        dispatch(getCompaniesStarted());

        firebase.database().ref('companies').on('value', (snapshot) => {
            let companies = [];

            snapshot.forEach(childSnapshot => {
                companies.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(getCompaniesSuccess(companies));
        });
    }
};

export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersStarted());

        firebase.database().ref('user').on('value', (snapshot) => {
            let users = [];
            let tests = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.hasChild('tests')) {
                    childSnapshot.child('tests').forEach(snapshot1 => {
                        tests.push({
                            id: snapshot1.key,
                            ...snapshot1.val()
                        })
                    })
                } else {
                    tests = [];
                }
                if (childSnapshot.hasChild('tests')) {
                    users.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                        tests
                    })
                } else {
                    users.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),

                    })
                }

            });
            dispatch(getUsersSuccess(users));
        });
    }
};

