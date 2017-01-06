import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import upload from './upload';
import posts from './posts';

const rootReducer = combineReducers({
	form, auth, upload, posts
});

export default rootReducer;
