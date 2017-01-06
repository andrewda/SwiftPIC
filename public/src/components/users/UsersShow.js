import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../posts/Post';
import { Card, CardTitle } from 'material-ui/Card';

import * as actions from '../../actions';

class UsersShow extends Component {
	componentWillMount() {
		this.props.fetchUserPosts(this.props.params.user);
	}

	renderPosts() {
		let posts = [];

		if (this.props.posts) {
			this.props.posts.forEach((post) => {
				posts.push(
					<Post post={post} style={{'width': '45%', 'margin-bottom': '20px'}} />
				);
			});
		}

		return posts;
	}

	render() {
		return (
			<div className="user">
				<Card>
			        <CardTitle title={`${this.props.params.user}'s posts`} />
			    </Card>
			    <div style={{'margin-top': '25px'}} className="post-list">
				    {this.renderPosts()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.user
	};
}

export default connect(mapStateToProps, actions)(UsersShow);