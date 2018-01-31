import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addRole } from '../../actions/role';

class AddRole extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			error: null,
			spin: false
		};
	}

	handleFormSubmit({ roleorder, rolename, rolecode }) {
		if(roleorder && rolename && rolecode) {
			this.setState({
				spin:true
			});
			this.props.addRole({ roleorder, rolename, rolecode }, err => {
				this.setState({ 
					error: err ? err : null,
					spin:false 
				});
				this.props.addRoleCallback(err);
			});
		}
	}
	renderAlert() {
		if (this.state.error) {
			return (
				<div className="alert alert-danger alert-dismissable">
					{this.state.error}
				</div>
			);
		}
	}
	
	renderField({ input, label, type, icon, meta: { touched, error } }) {
		return (
			<div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
				<input {...input} placeholder={label} type={type} className="form-control"/>
				<span className={`glyphicon glyphicon-${icon} form-control-feedback`}></span>
				<div className="help-block with-errors">{touched && error ? error : ''}</div>
			</div>
		)
	}

	render() {
		const { handleSubmit} = this.props;
		return (
			<div>
				<div className="login-boxw">
					<div className="login-logo"></div>
					<div className="login-box-body">
						<p className="login-box-msg" style={{fontSize: 24+'px'}}>添加角色</p>
						{this.renderAlert()}
						<form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<Field name="id" component={this.renderField} type="text" label="角色id" />
							<Field name="roleName" component={this.renderField} type="text"  label="角色名称" />
							<Field name="roleSign" component={this.renderField} type="text" label="角色标志" />
							<Field name="description" component={this.renderField} type="text" label="角色描述" />
							<div className="row">
								<div className="col-xs-8"></div>
								<div className="col-xs-4">
									<button type="submit" className="btn btn-primary btn-block btn-flat"><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 添加 </button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}


const validate = values => {
	const errors = {};

	if(!values.id) {
		errors.id = '角色id不能为空';
	}

	if(!values.roleName) {
		errors.roleName = '角色名称不能为空';
	}

	if(!values.roleSign) {
		errors.roleSign = '角色标志不能为空';
	}

	if(!values.description) {
		errors.description = '角色描述不能为空';
	}
	return errors;
};

const reduxAddRoleForm = reduxForm({
	form: 'RoleForm',
	validate
})(AddRole);

export default connect(null, { addRole })(reduxAddRoleForm);
