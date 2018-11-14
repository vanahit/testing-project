import {CREATE_QUESTION_ANSWER, ACTIVE_ANSWER} from '../actions/actionTypes'

const initialState = {
  answers: [],
  activeAnswer: {}
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUESTION_ANSWER:
      return {
        ...state,
        answers: [...state.answers, state.activeAnswer]
      }
      case ACTIVE_ANSWER:
      return {
        ...state,
        activeAnswer : action.answer
      }

      default:
      return state
  }
}