import {CREATE_ANSWERS, SET_ANSWERS_VALUES} from './actionTypes'

export function createAnswers(answers) {
  console.log('this is action');
  return {
    type: CREATE_ANSWERS,
    answers
  }
}
export function setAnswersValues(answer) {
  console.log('this is action');
  return {
    type: SET_ANSWERS_VALUES,
    answer
  }
}
/*
export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
  }
}
*/