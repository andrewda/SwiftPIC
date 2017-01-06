import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';

import * as actions from '../../actions';

class PostsList extends Component {
	componentWillMount() {
		this.props.fetchLatestPosts();
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
			<div className="post-list" style={{'text-align':'center !important'}}>
				{this.renderPosts()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.latest
	};
}

export default connect(mapStateToProps, actions)(PostsList);
