import {ADD_QUESTION, DELETE_QUESTIONS} from '../actions/actionTypes';

const initialState = {
  questions: [],
}

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        questions: state.questions.concat(action.question),
      }
    case DELETE_QUESTIONS:
      return {
        questions: [],
      }
    default:
      return state
  }
}
