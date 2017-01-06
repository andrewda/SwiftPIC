import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import * as actions from '../../actions';

const style = {
	'width': '100%',
	'height': '150px',
	'margin': 'auto',
	'border': 'dashed grey',
	'line-height': '150px',
	'text-align': 'center'
};

class PostsNew extends Component {
	constructor(props) {
		super(props);
		
		this.onDrop = this.onDrop.bind(this);
	}
	
	onDrop(acceptedFiles) {
		if (acceptedFiles) {
			this.props.uploadImage(acceptedFiles[0]);
		}
	}
	
	render() {
		return (
			<div>
				<Dropzone className="upload" onDrop={this.onDrop} multiple={false} accept="image/*">
					<div>Upload an Image</div>
				</Dropzone>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		message: state.auth.message,
		upload: state.upload
	};
}

export default connect(mapStateToProps, actions)(PostsNew);
