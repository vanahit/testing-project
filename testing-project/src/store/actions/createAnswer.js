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

