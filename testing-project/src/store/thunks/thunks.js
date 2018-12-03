import {getCompaniesStarted, 
        getCompaniesSuccess, 
        getCompaniesFailure,
        getTestsStarted, 
        getTestsFailure, 
        getTestsSuccess,
        getUsersStarted,
        getUsersFailure,
        getUsersSuccess,
    } from '../actions/appAction';
import {firebase} from '../../firebase/firebase';

export const getTests = () => {
    return dispatch => {
        dispatch(getTestsStarted());
        
        firebase.database().ref('tests').on('value', (snapshot) => {
	       let tests = [];
	        snapshot.forEach(childSnapshot => {
	            tests.push({
	                id: childSnapshot.key,
	                ...childSnapshot.val()
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
             snapshot.forEach(childSnapshot => {
                users.push({
                     id: childSnapshot.key,
                     ...childSnapshot.val()
                }) 
            });
            dispatch(getUsersSuccess(users));
         });
     }  
 };