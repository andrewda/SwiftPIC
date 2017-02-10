import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
	title: {
		cursor: 'pointer'
	}
};

class Header extends Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = { open: false };
	}

	handleToggle() {
		this.setState({ open: !this.state.open });
	}

	handleClose() {
		this.setState({ open: false });
	}

	handleTitleClick() {
		this.context.router.push('/');
	}

	renderItems() {
		if (this.props.authenticated) {
			return [
				<Link className="nav-item" to="/signout" key={1}>
					<MenuItem onTouchTap={this.handleClose.bind(this)}>Sign Out</MenuItem>
				</Link>,
				<Link className="nav-item" to="/" key={2}>
					<MenuItem onTouchTap={this.handleClose.bind(this)}>Recent Posts</MenuItem>
				</Link>,
				<Link className="nav-item" to="/new" key={3}>
					<MenuItem onTouchTap={this.handleClose.bind(this)}>New Post</MenuItem>
				</Link>
			];
		} else {
			return [
				<Link className="nav-item" to="/signin" key={1}>
					<MenuItem onTouchTap={this.handleClose.bind(this)}>Sign In</MenuItem>
				</Link>,
				<Link className="nav-item" to="/signup" key={2}>
					<MenuItem onTouchTap={this.handleClose.bind(this)}>Sign Up</MenuItem>
				</Link>
			];
		}
	}

	render() {
		return (
			<div>
				<AppBar
					style={{ position: 'fixed' }}
					title={<span style={styles.title}>SwiftPIC</span>}
					onTitleTouchTap={this.handleTitleClick.bind(this)}
					onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })} >
					{this.renderItems()}
				</Drawer>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
