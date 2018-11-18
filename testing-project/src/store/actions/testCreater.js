import {ADD_QUESTION,  DELETE_QUESTIONS} from './actionTypes'

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
export function deleteQuestions() {
  return {
    type: DELETE_QUESTIONS,
    
  }
}

