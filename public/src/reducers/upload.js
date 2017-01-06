import {
	UPLOAD_IMAGE
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case UPLOAD_IMAGE:
			return { ...state, image: action.payload };
	}

	return state;
}
