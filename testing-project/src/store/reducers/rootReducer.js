import {combineReducers} from 'redux';
import authReducer from './authReducer';
import testCreator from './testCreator';
import testPasser from './testPasser';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    testCreator: testCreator,
    testPasser: testPasser,
    appReducer: appReducer,
});

export default rootReducer;


