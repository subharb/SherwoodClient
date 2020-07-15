import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import investigationsReducer from './investigationsReducer';


export default combineReducers({
    auth: authReducer,
    loading:loadingReducer,
    investigations : investigationsReducer,
    form: formReducer
});