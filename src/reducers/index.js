import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import loadingReducer from './loading';

export default combineReducers({
    auth: authReducer,
    loading:loadingReducer,
    form: formReducer
});