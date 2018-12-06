
import { GET_TESTS_STARTED, 
  GET_TESTS_SUCCESS, 
  GET_TESTS_FAILURE,
  GET_USERS_STARTED, 
  GET_USERS_SUCCESS, 
  GET_USERS_FAILURE,
  GET_COMPANIES_STARTED, 
  GET_COMPANIES_SUCCESS, 
  GET_COMPANIES_FAILURE,

} from '../actions/actionTypes';
  
  const initialState = {
    testsLoaded: false,
    usersLoaded: false,
    companiesLoaded: false,
    tests: [],
    companies: [],
    users: [],
    testsError: null,
    usersError: null,
    companiesError: null,
    userLogin: false,
    companyLogin: false,
  };
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      
      case GET_TESTS_STARTED:
        return {
          ...state,
          testsLoaded: false,
        };

      case GET_TESTS_SUCCESS:
        return {
          ...state,
          testsLoaded: true,
          testsError: null,
          tests: action.payload
        };

      case GET_TESTS_FAILURE:
        return {
          ...state,
          testsError: action.payload.error
        };

      case GET_USERS_STARTED:
        return {
          ...state,
          usersLoaded: false,
        };

      case GET_USERS_SUCCESS:
        return {
          ...state,
          usersLoaded: true,
          usersError: null,
          users: action.payload
        };
      case GET_USERS_FAILURE:
        return {
          ...state,
          usersError: action.payload.error
        };

      case GET_COMPANIES_STARTED:
        return {
          ...state,
          companiesLoaded: false
        };

      case GET_COMPANIES_SUCCESS:
        return {
          ...state,
          companiesLoaded: true,
          companiesError: null,
          companies: action.payload
        };

      case GET_COMPANIES_FAILURE:
        return {
          ...state,
          companiesLoaded: false,
          companiesError: action.payload.error
        };
  
      default:
        return state;
    }
  }