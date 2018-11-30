import { GET_TESTS_STARTED, 
        GET_TESTS_SUCCESS, 
        GET_TESTS_FAILURE,
        GET_USERS_STARTED, 
        GET_USERS_SUCCESS, 
        GET_USERS_FAILURE,
        GET_COMPANIES_STARTED, 
        GET_COMPANIES_SUCCESS, 
        GET_COMPANIES_FAILURE,

      } from "./actionTypes";
import axios from 'axios';

export const getTests = () => {
    return dispatch => {
      dispatch(getTestsStarted());
  
      axios
        .get('https://test-project-4ab6b.firebaseio.com/tests.json')
        .then(res => {
          setTimeout(() => {
            dispatch(getTestsSuccess(res.data));
          }, 0);
        })
        .catch(err => {
          dispatch(getTestsFailure(err.message));
        });
    };
  };

  const getTestsSuccess = tests => ({
    type: GET_TESTS_SUCCESS,
    payload: {
      ...tests
    }
  });
  
  const getTestsStarted = () => ({
    type: GET_TESTS_STARTED
  });
  
  const getTestsFailure = error => ({
    type: GET_TESTS_FAILURE,
    payload: {
      error
    }
  })



  export const getUsers = () => {
    return dispatch => {
      dispatch(getUsersStarted());
  
      axios
        .get('https://test-project-4ab6b.firebaseio.com/user.json')
        .then(user => {
          setTimeout(() => {
            dispatch(getUsersSuccess(user.data));
          }, 100);
        })
        .catch(err => {
          dispatch(getUsersFailure(err.message));
        });
    };
  };

  const getUsersSuccess = users => ({
    type: GET_USERS_SUCCESS,
    payload: {
      ...users
    }
  });
  
  const getUsersStarted = () => ({
    type: GET_USERS_STARTED
  });
  
  const getUsersFailure = error => ({
    type: GET_USERS_FAILURE,
    payload: {
      error
    }
  })

  export const getCompanies = () => {
    return dispatch => {
      dispatch(getCompaniesStarted());
  
      axios
        .get('https://test-project-4ab6b.firebaseio.com/companies.json')
        .then(companies => {
          setTimeout(() => {
            dispatch(getCompaniesSuccess(companies.data));
          }, 2000);
        })
        .catch(err => {
          dispatch(getCompaniesFailure(err.message));
        });
    };
  };

  const getCompaniesSuccess = companies => ({
    type: GET_COMPANIES_SUCCESS,
    payload: {
      ...companies
    }
  });
  
  const getCompaniesStarted = () => ({
    type: GET_COMPANIES_STARTED
  });
  
  const getCompaniesFailure = error => ({
    type: GET_COMPANIES_FAILURE,
    payload: {
      error
    }
  })