import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { AUTH_USER } from './actions/types';

import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RequireAuth from './components/auth/RequireAuth';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';
import Welcome from './components/Welcome';
import PostsList from './components/posts/PostsList';
import PostsNew from './components/posts/PostsNew';
import PostsShow from './components/posts/PostsShow';
import UsersShow from './components/users/UsersShow';

import reducers from './reducers';
import store from './store';

import { onIndexEnter, onPostsEnter, onUsersEnter } from './callbacks';

const token = localStorage.getItem('token');

if (token) {
	store.dispatch({
		type: AUTH_USER
	});
}

injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={PostsList} />

					<Route path="signin" component={SignIn} />
					<Route path="signout" component={SignOut} />
					<Route path="signup" component={SignUp} />

					<Route path="new" component={RequireAuth(PostsNew)} />
					<Route path=":user" component={UsersShow} />
					<Route path=":user/:url" component={PostsShow} onEnter={onPostsEnter} />
				</Route>
			</Router>
		</Provider>
	</MuiThemeProvider>
, document.querySelector('.container'));
