import {CREATE_QUESTION_ANSWER, ACTIVE_ANSWER} from './actionTypes'

export function createQuestionAnswer() {
  console.log('this is action');
  return {
    type: CREATE_QUESTION_ANSWER,
  }
}
export function activeAnswer(answer) {
  console.log('this is action');
  return {
    type: ACTIVE_ANSWER,
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