import { GET_TESTS_STARTED, 
        GET_TESTS_SUCCESS, 
        GET_TESTS_FAILURE,
        GET_USERS_STARTED, 
        GET_USERS_SUCCESS, 
        GET_USERS_FAILURE,
        GET_COMPANIES_STARTED, 
        GET_COMPANIES_SUCCESS, 
        GET_COMPANIES_FAILURE,
        USER_LOGIN,
        USER_LOGOUT,
        ADD_USER_TEST,
        DELETE_USER_TEST,
        ADD_PASSING_TEST,

      } from "./actionTypes";

  export function getTestsSuccess(tests) {
    return {
      type: GET_TESTS_SUCCESS,
      payload: [
        ...tests
      ]
    }
  };
  
  export function getTestsStarted () {
    return {
       type: GET_TESTS_STARTED
    }
  };
  
  export function getTestsFailure (error) {
    return {
      type: GET_TESTS_FAILURE,
      payload: {
        error
      }
    }
  };

  export function getUsersSuccess (users) {
    return {
      type: GET_USERS_SUCCESS,
      payload: [
        ...users
      ]
    }
  };
  
  export function getUsersStarted () {
    return {
      type: GET_USERS_STARTED
    }
  };
  
  export function getUsersFailure (error) {
    return {
      type: GET_USERS_FAILURE,
      payload: {
        error
      }
    }
  };


  export function getCompaniesSuccess (companies) {
    return {
      type: GET_COMPANIES_SUCCESS,
      payload: [
        ...companies
      ]
    }
  };
  
  export function getCompaniesStarted () {
    return {
      type: GET_COMPANIES_STARTED
    }
  };
  
  export function getCompaniesFailure (error) {
    return {
      type: GET_COMPANIES_FAILURE,
      payload: {
        error
      }
    }
};

export function userLogin (userType) {
  return {
    type: USER_LOGIN,
    userType
  }
};

export function userLogout () {
  return {
    type: USER_LOGOUT,
     
  }
};

export function addUserTest (test) {
  return {
    type: ADD_USER_TEST,
    test
  }
};

export function deleteUserTest () {
  return {
    type: DELETE_USER_TEST,
  }
};

export function addPassingTest (test) {
  return {
    type: ADD_PASSING_TEST,
    test
  }
};