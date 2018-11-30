import {combineReducers} from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import testCreator from './testCreator';
import testPasser from './testPasser';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    testCreator: testCreator,
    testPasser: testPasser,
    appReducer: appReducer,
});

export default rootReducer;


