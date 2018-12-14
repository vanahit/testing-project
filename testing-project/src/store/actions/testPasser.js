import {DELETE_TEST, ADD_TEST, INCREASE_USER_SCORE} from './actionTypes'

export function deleteTest() {
    return {
        type: DELETE_TEST,
    }
}

export function addTest(test) {
    return {
        type: ADD_TEST,
        test
    }
}
  
export function increaseUserScore(score) {
    return {
        type: INCREASE_USER_SCORE,
        score
    }
}

  