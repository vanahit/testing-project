import {INCREASE_TOTAL_SCORE, SUBMITTED_FALSE, SUBMITTED_TRUE} from './actionTypes'

export function increaseTotalScore(score) {
  return {
    type: INCREASE_TOTAL_SCORE,
    score
    
  }
}

export function submittedFalse() {
  return {
    type: SUBMITTED_FALSE,
   
  }
}
export function submittedTrue() {
  return {
    type: SUBMITTED_TRUE,
   
  }
}

