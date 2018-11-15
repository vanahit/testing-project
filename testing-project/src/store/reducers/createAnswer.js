import {CREATE_ANSWERS, SET_ANSWERS_VALUES} from '../actions/actionTypes'

const initialState = {
  answers: [{id: 1, title: ''}, {id: 2, title: ''}],
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ANSWERS:
      return {
<<<<<<< HEAD
        // ...state,
        answers: [...state.answers, ...state.activeAnswer]
      }
    case ACTIVE_ANSWER:
=======
        ...state,
        answers: action.answers
      }
      case SET_ANSWERS_VALUES:
>>>>>>> 2b1e4c10b7cc4402671dfa41059a9e04e225c00f
      return {
        activeAnswer : action.answer
      }

      default:
      return state
  }
}