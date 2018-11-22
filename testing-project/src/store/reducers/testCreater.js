import {INCREASE_TOTAL_SCORE, SUBMITTED_FALSE, SUBMITTED_TRUE} from '../actions/actionTypes';

const initialState = {
  questions: [],
  totalScore: 0,
  submitted: false,
}

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE_TOTAL_SCORE:
      return {
        ...state,
        totalScore: state.totalScore + action.score,
      }
    case SUBMITTED_FALSE:
      return {
        ...state,
        submitted: false,
      }
    case SUBMITTED_TRUE:
      return {
        ...state,
        submitted: true,
      }
    default:
      return state
    
  }
  
}
