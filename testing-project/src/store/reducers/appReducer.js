
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
    usersLoading: false,
    companiesLoading: false,
    tests: [],
    companies: [],
    users: [],
    testsError: null,
    usersError: null,
    companiesError: null,
  };
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      
      case GET_TESTS_STARTED:
        return {
          ...state,
          testsLoading: true
        };

      case GET_TESTS_SUCCESS:
        return {
          ...state,
          testsLoaded: true,
          testsError: null,
          tests: [action.payload]
        };

      case GET_TESTS_FAILURE:
        return {
          ...state,
          testsLoading: false,
          testsError: action.payload.error
        };

      case GET_USERS_STARTED:
        return {
          ...state,
          usersLoading: true
        };

      case GET_USERS_SUCCESS:
        return {
          ...state,
          usersLoading: false,
          usersError: null,
          users: [action.payload]
        };
      case GET_USERS_FAILURE:
        return {
          ...state,
          usersLoading: false,
          usersError: action.payload.error
        };

      case GET_COMPANIES_STARTED:
        return {
          ...state,
          companiesLoading: true
        };

      case GET_COMPANIES_SUCCESS:
        return {
          ...state,
          companiesLoading: false,
          companiesError: null,
          companies: [action.payload]
        };

      case GET_COMPANIES_FAILURE:
        return {
          ...state,
          companiesLoading: false,
          companiesError: action.payload.error
        };
      default:
        return state;
    }
  }