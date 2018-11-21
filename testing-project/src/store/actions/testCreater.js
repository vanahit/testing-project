import {INCREASE_TOTAL_SCORE} from './actionTypes'

export function increaseTotalScore(score) {
  return {
    type: INCREASE_TOTAL_SCORE,
    score
    
  }
}

