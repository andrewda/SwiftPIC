import axios from 'axios';
import { browserHistory } from 'react-router';

import {
	AUTH_USER,
	UNAUTH_USER,
	SIGNUP_USER,
	AUTH_ERROR,
	RESET_ERROR,
	FETCH_LATEST_POSTS,
	FETCH_USER_POSTS,
	FETCH_POST,
	UPLOAD_IMAGE
} from './types';

const ROOT_URL = 'https://act-andrewda.c9users.io';

export function signinUser({ username, password }) {
	return function(dispatch) {
		// Submit username/password to server
		axios.post(`${ROOT_URL}/signin`, { username, password })
			.then((response) => {
				// If request is good...
				// - update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect ro the route '/posts'
				browserHistory.push('/posts');

			})
			.catch((error) => {
				// If request is bad...
				// - show an error to the user
				dispatch(authError('Incorrect login information'));
			});
	};
}

export function signoutUser() {
	localStorage.removeItem('token');
	browserHistory.push('/');

	return { type: UNAUTH_USER };
}

export function signupUser({ username, email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { username, email, password })
			.then((response) => {
				// If request is good...
				// - update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to the route '/posts'
				browserHistory.push('/posts');
			})
			.catch((error) => {
				dispatch(authError(error.response.data.error));
			});
	};
}

export function fetchLatestPosts() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/api/posts/latest`)
			.then((response) => {
				dispatch({
					type: FETCH_LATEST_POSTS,
					payload: response.data
				});
			});
	};
}

export function fetchUserPosts(username) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/api/posts/${username}`)
			.then((response) => {
				dispatch({
					type: FETCH_USER_POSTS,
					payload: response.data
				});
			});
	};
}

export function fetchPost(username, url) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/api/posts/data/${username}/${url}`)
			.then((response) => {
				dispatch({
					type: FETCH_POST,
					payload: response.data
				});
			});
	};
}

export function uploadImage(image) {
	return function(dispatch) {
		const reader = new FileReader();
		
		reader.readAsDataURL(image);
		reader.onload = () => {
			const arrayBuffer = reader.result;
			
			axios.post(`${ROOT_URL}/upload`, { image: arrayBuffer }, {
				headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
			})
				.then((response) => {
					dispatch({
						type: UPLOAD_IMAGE,
						payload: response.data
					});
					
					browserHistory.push(`/posts/${response.data.user}/${response.data.url}`);
				})
				.catch((error) => {
					dispatch({
						type: UNAUTH_USER
					});
				});
		};
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function resetError() {
	return {
		type: RESET_ERROR
	};
}
