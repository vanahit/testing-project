import {CHANGE_TOTAL_SCORE, SUBMITTED_TRUE, DELETE_QUESTION, ADD_QUESTION, ADD_QUESTION_SUBMITTED,
   ANSWER_VALID, ANSWER_NOT_VALID, QUESTION_VALID, QUESTION_NOT_VALID, 
   TEST_VALID, TEST_NOT_VALID, UPDATE_QUESTIONS, DELETE_STATE_DATA, TEST_CREATED_FALSE} from './actionTypes'

export function changeTotalScore(score) {
  return {
    type: CHANGE_TOTAL_SCORE,
    score
   }
}

export function submittedTrue() {
  return {
    type: SUBMITTED_TRUE,
   
  }
}

export function addQuestion() {
  return {
    type: ADD_QUESTION,
  }
}

export function deleteQuestion(id, score) {
  return {
    type: DELETE_QUESTION,
    id,
    score,
  }
}

export function addQuestionSubmitted() {
  return {
    type: ADD_QUESTION_SUBMITTED,
    
  }
}

export function answerValid() {
  return {
    type: ANSWER_VALID,
  }
}
export function answerNotValid() {
  return {
    type: ANSWER_NOT_VALID,
  }
}

export function questionValid() {
  return {
    type: QUESTION_VALID,
  }
}

export function questionNotValid() {
  return {
    type: QUESTION_NOT_VALID,
  }
}

export function testValid() {
  return {
      type: TEST_VALID,
     
  }
}

export function testNotValid() {
  return {
      type: TEST_NOT_VALID,
     
  }
}
export function updateQuestions(questions) {
  return {
      type: UPDATE_QUESTIONS,
      questions
     
  }
}

export function deleteStateData() {
  return {
    type: DELETE_STATE_DATA,
   
  }
}

export function testCreatedFalse() {
  return {
    type: TEST_CREATED_FALSE,
   
  }
}




