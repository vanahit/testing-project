import {combineReducers} from 'redux';
import quizReducer from './createAnswer';


export default combineReducers ({
	quiz: quizReducer,
});