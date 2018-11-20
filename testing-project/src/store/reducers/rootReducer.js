import {combineReducers} from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import testReducer from './testCreater';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    test: testReducer,
});

export default rootReducer;


