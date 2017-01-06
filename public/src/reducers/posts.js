import {
	FETCH_LATEST_POSTS,
	FETCH_USER_POSTS,
	FETCH_POST
} from '../actions/types';

export default function(state = { latest: [], user: [] }, action) {
	switch(action.type) {
		case FETCH_LATEST_POSTS:
			return { ...state, latest: action.payload };
		case FETCH_USER_POSTS:
			return { ...state, user: action.payload };
		case FETCH_POST:
			return { ...state, post: action.payload };
	}

	return state;
}
