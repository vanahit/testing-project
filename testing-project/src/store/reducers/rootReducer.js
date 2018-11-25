import {combineReducers} from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import testReducer from './testCreater';
import testPasser from './testPasser';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    test: testReducer,
    testPasser: testPasser,
});

export default rootReducer;


