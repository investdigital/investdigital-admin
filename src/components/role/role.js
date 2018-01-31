import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRoleList } from '../../actions/role';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import AddRole from './role_add';

class Role extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isAddModalOpen : false,
            actionSuccess: null,
            actionResult: '',
            selectedIndex: null
        };
    }
    componentWillMount() {
        // console.log(this.props);
        this.props.fetchRoleList(function (err) {
          if(err) alert(err);
        });
    }
    renderRows() {
        console.log(this.props);        
        return this.props.all.map((row, idx) => {
            return (
                <tr key={idx}>
                    <td>{row.id}</td>
                    <td>{row.roleName}</td>
                    <td>{row.roleSign}</td>
                    <td>{row.description}</td>
                    <td>
                        <button className={`btn btn-sm warning hidden margin-r-5`} onClick={this.handleEditClick.bind(this, idx)}>编辑</button>
                        <button className={`btn btn-sm warning hidden margin-r-5`} onClick={this.handleDeleteClick.bind(this, idx)}>删除</button>
                    </td>
                </tr>
            );
        });
    }
    handleEditClick(index) {
        this.setState({
            selectedIndex: index,
            isDetailModalOpen: true 
        });
    }
    handleAddClick() {
        this.setState({
            isAddModalOpen: true
        });
    }

    hideAddModal = () => {
        this.setState({
            isAddModalOpen: false
        });
    };
    addRoleCallback(err) {
        if(!err){
          this.props.fetchRoleList();
          this.setState({
              isAddModalOpen: false,
              isModalOpen: true,
              actionSuccess:true, 
              actionResult:'添加角色成功!'
          });
        }
    }
    render () {
        if(this.props.all === null) {
            return <div><section className="content"><h1>Loading...</h1></section></div>
        }
        return (
            <div>
                <section className="content-header"><h1></h1></section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-info">
                                <div className="box-header">
                                    <h3 className="box-title">角色管理</h3>
                                    <button className="btn success pull-right" onClick={this.handleAddClick.bind(this)}><i className="fa fa-plus"></i> 添加角色</button>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <th>id</th>
                                                <th>名称</th>
                                                <th>标志</th>
                                                <th>描述</th>
                                                <th>操作</th>
                                            </tr>
                                            {/* { this.renderRows() } */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer clearfix">
                                </div>
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
                        <button className='btn btn-default' onClick={this.hideModal}>关闭</button>
                    </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.isAddModalOpen} onRequestHide={this.hideAddModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideAddModal}/>
                        <ModalTitle>添加角色</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <AddRole addRoleCallback={this.addRoleCallback.bind(this)}/>
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
        all: state.role.all
    };
}
export default connect(mapStateToProps, { fetchRoleList })(Role);