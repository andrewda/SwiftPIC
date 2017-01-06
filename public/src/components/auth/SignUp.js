import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class SignUp extends Component {
	handleFormSubmit({ username, email, password }) {
		this.props.signupUser({ username, email, password });
	}

	renderInput(field) {
		return (
			<div>
				<TextField
					{...field.input}
					type={field.type}
					floatingLabelText={field.label}
					errorText={field.meta.touched && field.meta.error} />
			</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;

		const actions = [
			<RaisedButton
				label="OK"
				primary={true}
				onTouchTap={this.props.resetError} />
		];

		return (
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<Field
						name="username"
						label="Username"
						type="text"
						component={this.renderInput} />
					<Field
						name="email"
						label="Email"
						type="text"
						component={this.renderInput} />
					<Field
						name="password"
						label="Password"
						type="password"
						component={this.renderInput} />
					<Field
						name="passwordConfirm"
						label="Confirm Password"
						type="password"
						component={this.renderInput} />
					<RaisedButton
						type="submit"
						label="Sign Up"
						primary={true} />
				</form>

				<Dialog
					actions={actions}
					modal={false}
					open={!!this.props.errorMessage}
					onRequestClose={this.props.resetError} >
					{this.props.errorMessage}
				</Dialog>
			</div>
		);
	}
}

function validate(formProps) {
	const errors = {};

	if (!formProps.username) {
		errors.username = 'Enter a username';
	}

	if (!formProps.email) {
		errors.email = 'Enter an email';
	}

	if (!formProps.password) {
		errors.password = 'Enter a password';
	}

	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Enter a password confirmation';
	}

	if (!/^[a-zA-Z0-9-_.]*$/.test(formProps.username)) {
		errors.username = 'Enter a valid username (a-z, A-Z, 0-9, - _ .)';
	}

	if (formProps.email && (formProps.email.indexOf('@') === -1 || formProps.email.indexOf('.') === -1)) {
		errors.email = 'Enter a valid email';
	}

	if ((formProps.password || formProps.passwordConfirm) && formProps.password !== formProps.passwordConfirm) {
		errors.password = 'Passwords must match';
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error
	};
}

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'SignUp',
	validate
})(SignUp));
