import userreduser from './reducer-user';
import {combineReducers} from 'redux';
import activeUserReducer from './activeuserreducer'
import valObjreducer from './reducer-insertvalues';
import stateReducer from './reducer-state';
import cityReducer from './reducer-city';
import pageReducer from './pagingreducer';
import loginReducer from './loginreducer';
import loginVals from './loginValsreducer';
 const allreducers=combineReducers({
    user:userreduser,
    activeUser:activeUserReducer,
    stateData:stateReducer,
    cityData:cityReducer,
    vals:valObjreducer,
    page:pageReducer,
    logindata:loginReducer
});
export default  allreducers;