import {combineReducers} from 'redux';
import testReducer from './testCreater';

export default combineReducers ({
	test: testReducer,
});