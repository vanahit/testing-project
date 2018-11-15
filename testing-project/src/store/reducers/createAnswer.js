import {CREATE_ANSWERS, SET_ANSWERS_VALUES} from '../actions/actionTypes'

const initialState = {
  answers: [{id: 1, title: ''}, {id: 2, title: ''}],
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ANSWERS:
      return {
        ...state,
        answers: action.answers
      }
      case SET_ANSWERS_VALUES:
      return {
        ...state,
        activeAnswer : action.answer
      }

      default:
      return state
  }
}