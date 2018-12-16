import {DELETE_TEST, ADD_TEST, INCREASE_USER_SCORE, GET_TEST_SUCCESS} from '../actions/actionTypes';

const initialState = {
    testDetails: 'no',
    userScore: 0,
    testLoaded: false,
}

export default function testPasser(state = initialState, action) {
    switch (action.type) {
        case DELETE_TEST:
            return {
                ...state,
                testDetails: {},
            }
        case ADD_TEST:
            return {
                ...state,
                testDetails: action.test,
            }
        case GET_TEST_SUCCESS:
            return {
            testLoaded: true,
        }
        case INCREASE_USER_SCORE:
            return {
                ...state,
                userScore: state.userScore + action.score,
            }
        default:
            return state
    }
}
  