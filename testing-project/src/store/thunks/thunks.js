import {getCompaniesStarted, 
        getCompaniesSuccess, 
        getCompaniesFailure,
        getTestsStarted, 
        getTestsFailure, 
        getTestsSuccess,
        getUsersStarted,
        getUsersFailure,
        getUsersSuccess,
        editingTest,
    } from '../actions/appAction';
import {firebase} from '../../firebase/firebase';
import { addEditingQuestions } from '../actions/testCreator';

export const getTests = () => {
    return dispatch => {
        dispatch(getTestsStarted());
        
        firebase.database().ref('tests').on('value', (snapshot) => {
           let tests = [];
           let passers = [];
	        snapshot.forEach(childSnapshot => {
                childSnapshot.child('passers').forEach (snapshot1 => {
                    passers.push({ 
                        id: snapshot1.key,
                        ...snapshot1.val()
                    })
                })
	            tests.push({
	                id: childSnapshot.key,
                    ...childSnapshot.val(),
                    passers
                }) 
                
               
            });
            dispatch(getTestsSuccess(tests));
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
                childSnapshot.child('tests').forEach (snapshot1 => {
                    tests.push({ 
                        id: snapshot1.key,
                        ...snapshot1.val()
                    })
                })
                users.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(), 
                    tests
               }) 
               
            });
            dispatch(getUsersSuccess(users));
         });
     }  
 };

