import {DELETE_TEST, ADD_TEST, INCREASE_USER_SCORE} from '../actions/actionTypes';

const initialState = {
    testDetails: {},
    userScore: 0,
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
        case INCREASE_USER_SCORE:
            return {
                ...state,
                userScore: state.userScore + action.score,
            }
        default:
            return state
    }
}
  