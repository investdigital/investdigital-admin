import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addJurisdiction } from '../../actions/jurisdiction';

class AddJurisdiction extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			error:null,
			spin:false
		};
	}

	handleFormSubmit({ jname, jurl }) {
		if(jname && jurl) {
			this.setState({
				spin:true
			});
			this.props.addJurisdiction({ jname, jurl }, err => {
				this.setState({ 
					error: err ? err : null, spin:false 
				});
				this.props.addCallback(err);
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
						<p className="login-box-msg" style={{fontSize: 24+'px'}}>添加权限</p>
						{this.renderAlert()}
						<form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<Field name="jname" component={this.renderField} type="text"  label="权限名称" />
							<Field name="jtype" component={this.renderField} type="text" label="类型" />
							<Field name="jurl" component={this.renderField} type="text" label="权限路径(URL)" />
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

	if(!values.jname) {
		errors.jname = '权限名称不能为空';
	}

	if(!values.jtype) {
		errors.jtype = '类型不能为空';
	}

	if(!values.jurl) {
		errors.jurl = '权限路径不能为空';
	}

	return errors;
};


const reduxAddJurisdictionForm = reduxForm({
	form: 'JurisdictionForm',
	validate
})(AddJurisdiction);

export default connect(null, { addJurisdiction })(reduxAddJurisdictionForm);