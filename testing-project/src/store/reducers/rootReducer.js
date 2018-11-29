import {combineReducers} from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import testCreator from './testCreator';
import testPasser from './testPasser';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    testCreator: testCreator,
    testPasser: testPasser,
});

export default rootReducer;


