import {CREATE_ANSWERS, SET_ANSWERS_VALUES} from '../actions/actionTypes'

const initialState = {
  answers: [{id: 1, title: ''}, {id: 2, title: ''}],
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ANSWERS:
      return {
        answers: action.answers
      }
    case SET_ANSWERS_VALUES:
      return {
        activeAnswer : action.answer
      }

      default:
      return state
  }
}