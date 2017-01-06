import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class SignIn extends Component {
	constructor(props) {
		super(props);
		
		this.state = { loading: false, receivedError: false };
		
		this.handleDialogClose = this.handleDialogClose.bind(this);
	}
	
	handleFormSubmit({ username, password }) {
		this.setState({ loading: true, receivedError: false });
		this.props.signinUser({ username, password });
	}
	
	handleDialogClose() {
		this.props.resetError();
	}

	renderInput(field) {
		return (
			<TextField
				{...field.input}
				type={field.type}
				floatingLabelText={field.label} />
		);
	}
	
	renderButton() {
		return (
			<RaisedButton
				type="submit"
				label="Sign In"
				primary={true}
				disabled={this.state.loading} />
		);
	}

	render() {
		const { handleSubmit } = this.props;

		const actions = [
			<RaisedButton
				label="OK"
				primary={true}
				onTouchTap={this.handleDialogClose} />
		];

		if (this.props.errorMessage && !this.state.receivedError) {
			this.setState({ loading: false, receivedError: true });
		}

		return (
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<Field
						name="username"
						label="Username"
						type="text"
					 	component={this.renderInput} />
					<br />
					<Field
						name="password"
						label="Password"
						type="password"
						component={this.renderInput} />
					<br />
					{this.renderButton()}
				</form>

				<Dialog
					actions={actions}
					modal={false}
					open={!!this.props.errorMessage}
					/*onRequestClose={this.handleDialogClose()}*/ >
					{this.props.errorMessage}
				</Dialog>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'SignIn'
})(SignIn));
