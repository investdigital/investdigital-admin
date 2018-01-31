import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMenuList } from '../../actions/menu';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import jwtDecode from 'jwt-decode';
// import AddMenu from './menu_add';


class Menu extends Component {
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
        console.log(this.props);
        // this.props.fetchJurisdictionList(function (err) {
        //   if(err) alert(err);
        // });
    }
   
    hideModal = () => {
        this.setState({
            isModalOpen: false
        });
    };
    
    handleAddClick() {
        this.setState({
            isAddModalOpen: true
        });
    }

    hideAddModal = () => {
        this.setState({
            isAddModalOpen : false
        });
    };

    addCallback(err) {
        if(!err){
            this.props.fetchJurisdictionList();
            this.setState({
                isAddModalOpen : false,
                isModalOpen: true,
                actionSuccess:true,
                actionResult:'菜单添加成功!' 
            });
        }
    }
    addUserCallback(err) {
    if(!err){
        this.props.fetchUserList();
        this.setState({
            isAddModalOpen: false,
            isModalOpen: true,
            actionSuccess:true,
            actionResult:'菜单添加成功!' 
        });
    }
    }
    render () {
        if(this.props.all === null) {
            return <div><section className="content"><h1>Loading...</h1></section></div>
        }
        // const menulist = [
        //     {
        //         id: 1,
        //         name: '权限管理',
        //         url: '/admin/default/jurisdiction'
        //     },
        //     {
        //         id: 1,
        //         name: '角色管理',
        //         url: '/admin/default/role'
        //     }
        // ]
        return (
            <div>
                {/* 菜单管理页面 */}
                <section className="content-header"><h1></h1></section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-info">
                                <div className="box-header">
                                    <h3 className="box-title">菜单列表</h3>
                                    <button className="btn success pull-right" onClick={this.handleAddClick.bind(this)}><i className="fa fa-plus"></i>新增菜单</button>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                                <th>name</th>
                                                <th>url</th>
                                                <th>操作</th>
                                            </tr>
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
                        <button className='btn btn-default' onClick={this.hideModal}>
                        关闭
                        </button>
                    </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.isAddModalOpen} onRequestHide={this.hideAddModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideAddModal}/>
                        <ModalTitle>添加权限</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {/* <AddJurisdiction addCallback={this.addUserCallback.bind(this)}/> */}
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log(state);
    return {
        all: state.menu.all
    };
}
export default connect(mapStateToProps, { fetchMenuList })(Menu);



