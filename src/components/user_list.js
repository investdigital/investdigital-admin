import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserList, disableUser } from '../actions/user';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
	Modal,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalBody,
	ModalFooter
} from 'react-modal-bootstrap';
import jwtDecode from 'jwt-decode';
import AddUser from './user_add';

class UserList extends Component {
	constructor(props) {
		super(props);
		const { authority } = jwtDecode(localStorage.getItem('token'));
		this.state = {
			isModalOpen: false,
			isAddModalOpen : false,
			actionSuccess: null,
			actionResult: '',
			isAdmin: authority === 'MANAGE',
			currentUser: JSON.parse(localStorage.getItem('loginname'))
		};
	}

	componentWillMount() {
		this.props.fetchUserList(function (err) {
			//console.log(err);
			if(err) alert(err);
		});
	}

	hideModal = () => {
		this.setState({
			isModalOpen: false
		});
	};

	renderRows() {
		return this.props.all.map((row, idx) => {
			let button = null;
			if(row.loginname != this.state.currentUser) { // this.state.isAdmin && row.loginname != this.state.currentUser
				button = <button className="btn btn-sm danger margin-r-5" onClick={this.handleStopClick.bind(this, row)}>删除</button>;
			}
			return (
				<tr key={idx}>
					<td>{row.id}</td>
					<td>{row.loginname}</td>
					<td>{row.mobilephone}</td>
					<td>{button}</td>
				</tr>
			);
		});
	}

	handleStopClick({loginname}) {
		if(!window.confirm('确定删除该账号？')) return false;
			this.props.disableUser(loginname, 0, success => {
			console.log(success);
			if(success) {//操作成功
				this.props.fetchUserList();
			}
			this.setState({
				isModalOpen: true,
				actionSuccess:success,
				actionResult: success?'操作成功!':'操作失败' 
			});
		});
	};

	handleAddClick() {
		this.setState({isAddModalOpen: true});
	}

	hideAddModal = () => {
		this.setState({ isAddModalOpen : false });
	};

	addUserCallback(err) {
		if(!err){
			this.props.fetchUserList();
			this.setState({
				isAddModalOpen: false,
				isModalOpen: true,
				actionSuccess:true,
				actionResult:'用户添加成功!' 
			});
		}
	}

	render() {
		// console.log(this.props.all);
		if(this.props.all===null) {
			return <div><section className="content"><h1>Loading...</h1></section></div>
		}

		let button = null;
		if(this.state.isAdmin) {
			button = <button className="btn success pull-right" onClick={this.handleAddClick.bind(this)}><i className="fa fa-plus"></i> 添加用户</button>;
		}
		return (
			<div>
				<section className="content-header"><h1></h1></section>
				<section className="content">
					<div className="row">
						<div className="col-xs-12">
							<div className="box box-info">
								<div className="box-header">
									<h3 className="box-title">用户</h3>
									{/* {button} */}
									<button className="btn success pull-right" onClick={this.handleAddClick.bind(this)}><i className="fa fa-plus"></i> 添加用户</button>
								</div>
								<div className="box-body table-responsive no-padding">
									<table className="table table-bordered table-hover">
										<tbody>
											<tr>
												<th>ID</th>
												<th>登录名称</th>
												<th>手机号</th>
												<th>操作</th>
											</tr>
											{ this.renderRows() }
										</tbody>
									</table>
								</div>
								<div className="box-footer clearfix"></div>
							</div>
						</div>
					</div>
				</section>

				<Modal isOpen={this.state.isModalOpen} onRequestHide={this.hideModal}>
					<ModalHeader>
						<ModalClose onClick={this.hideModal}/>
						<ModalTitle>提示:</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<p className={this.state.actionSuccess?'text-green':'text-red'}>
							{this.state.actionResult}
						</p>
					</ModalBody>
					<ModalFooter>
						<button className='btn btn-default' onClick={this.hideModal}>
						关闭
						</button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.isAddModalOpen} onRequestHide={this.hideAddModal}>
					<ModalHeader>
						<ModalClose onClick={this.hideAddModal}/>
						<ModalTitle>用户注册</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<AddUser addCallback={this.addUserCallback.bind(this)}/>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		all: state.user.all
	};
}

export default connect(mapStateToProps, { fetchUserList, disableUser })(UserList);