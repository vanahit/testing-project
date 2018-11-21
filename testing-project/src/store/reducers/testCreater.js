import {INCREASE_TOTAL_SCORE} from '../actions/actionTypes';

const initialState = {
  questions: [],
  totalScore: 0,
  isValid: '',
}

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    
    case INCREASE_TOTAL_SCORE:
    return {
      totalScore: state.totalScore + action.score,
    }
    default:
      return state
    
  }
  
}
