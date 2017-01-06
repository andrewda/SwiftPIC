import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Post from './Post';

import * as actions from '../../actions';

class PostsShow extends Component {
    static contextTypes = {
		router: PropTypes.object
	};
	
	componentWillMount() {
		console.log(this.props.params)
		this.props.fetchPost(this.props.params.user, this.props.params.url);
	}

	renderPost() {
		console.log(this.props)
		if (this.props.post) {
			return <Post post={this.props.post} />
		}
	}

	render() {
		return (
			<div className="post-list">
				{this.renderPost()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.post
	};
}

export default connect(mapStateToProps, actions)(PostsShow);
