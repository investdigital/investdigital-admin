import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJurisdictionList } from '../../actions/jurisdiction';
import { Link } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import jwtDecode from 'jwt-decode';
import AddJurisdiction from './jurisdiction_add';

class Jurisdiction extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isAddModalOpen : false,
            actionSuccess: null,
            actionResult: '',
            selectedIndex: null,
            selectedItem: null
        };
    }
    componentWillMount() {
        // console.log(this.props);
        this.props.fetchJurisdictionList();
    }
    hideModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    renderRows() {
        // console.log(this.props.all);
        // return this.props.all.map((row, idx) => {
        //     let buttons = null;
        //     buttons.push(<button className="btn btn-sm btn-default margin-r-5" onClick={this.handleEditClick.bind(this, row)}  key="1">编辑</button>);
        //     buttons.push(<button className="btn btn-sm btn-default margin-r-5" onClick={this.handleDeleteClick.bind(this, row)}  key="2">删除</button>);
        //     buttons.push(<button className="btn btn-sm btn-default margin-r-5" onClick={this.handleQueryClick.bind(this, row)}  key="3">查询</button>);
        //     return (
        //         <tr key={idx}>
        //             <td>{row.name}</td>
        //             <td>{row.type}</td>
        //             <td>{row.url}</td>
        //             <td>{buttons}</td>
        //         </tr>
        //     );
        // });
    }
    
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

    addJurisdictionCallback(err) {
        if (!err) {
            this.props.fetchJurisdictionList();
            this.setState({
                isAddModalOpen: false,
                isModalOpen: true,
                actionSuccess:true,
                actionResult:'权限添加成功!'
            });
        }
    }
    render() {
        // if(this.props.all===null) {
        //     return <div><section className="content"><h1>Loading...</h1></section></div>
        // }
        return (
        <div>
            <section className="content-header"><h1></h1></section>
            <section className="content">
                <div className="row">
                <div className="col-xs-12">
                    <div className="box box-info">
                    <div className="box-header">
                        <h3 className="box-title">权限</h3>
                        <button className="btn success pull-right" onClick={this.handleAddClick.bind(this)}><i className="fa fa-plus"></i> 添加权限</button>
                    </div>
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <th>权限名称</th>
                            <th>类型</th>
                            <th>路径</th>
                            <th>操作</th>
                        </tr>
                        {/* <tr>
                            <td>1</td>
                            <td>用户管理</td>
                            <td>目录</td>
                            <td>/manage/role/index</td>
                            <td>正常</td>
                            <td>
                                <button className="btn btn-sm btn-default margin-r-5">编辑</button>
                                <button className="btn btn-sm btn-default margin-r-5">删除</button>
                                <button className="btn btn-sm btn-default margin-r-5">查询</button>
                            </td>
                        </tr> */}
                        { this.renderRows() }
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
                    <AddJurisdiction addJurisdictionCallback={this.addJurisdictionCallback.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>)
      }
}
function mapStateToProps(state) {
    // console.log(state.jurisdiction);
    return {
        all: state.jurisdiction.all
    };
}
export default connect(mapStateToProps, { fetchJurisdictionList })(Jurisdiction);

















// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchJurisdictionList } from '../../actions/jurisdiction';
// import {
//     Modal,
//     ModalHeader,
//     ModalTitle,
//     ModalClose,
//     ModalBody,
//     ModalFooter
// } from 'react-modal-bootstrap';
// import jwtDecode from 'jwt-decode';
// import AddJurisdiction from './jurisdiction_add';

// class Jurisdiction extends Component {
//     constructor (props) {
//         super(props);
//         this.state = {
//             isModalOpen: false,
//             isAddModalOpen : false,
//             actionSuccess: null,
//             actionResult: '',
//             selectedIndex: null
//         };
//     }
//     componentWillMount() {
//         console.log(this.props);
//         // this.props.fetchJurisdictionList(function (err) {
//         //   if(err) alert(err);
//         // });
//     }
//     // renderRows() {
//     //     return this.props.all.map((row, idx) => {
//     //         return (
//     //             <tr key={idx}>
//     //                 <td>{row.id}</td>
//     //                 <td>{row.name}</td>
//     //                 <td>{row.url}</td>
//     //                 <td>
//     //                     <button className={`btn btn-sm warning hidden margin-r-5`}
//     //                             onClick={this.handleDetailClick.bind(this, idx)}>详情</button>
//     //                     <Link className="btn btn-sm warning margin-r-5" to={`/jurisdiction/${row.id}`}>详情</Link>
//     //                 </td>
//     //             </tr>
//     //         );
//     //     });
//     // }
//     handleDetailClick(index) {
//         this.setState({
//             selectedIndex: index,
//             isDetailModalOpen: true 
//         });
//     }
//     hideModal = () => {
//         this.setState({
//             isModalOpen: false
//         });
//     };
    
//     handleAddClick() {
//         this.setState({
//             isAddModalOpen: true
//         });
//     }

//     hideAddModal = () => {
//         this.setState({
//             isAddModalOpen : false
//         });
//     };

//     addCallback(err) {
//         if(!err){
//             this.props.fetchJurisdictionList();
//             this.setState({
//                 isAddModalOpen : false,
//                 isModalOpen: true,
//                 actionSuccess:true,
//                 actionResult:'权限添加成功!' 
//             });
//         }
//     }
//     addJurisdictionCallback(err) {
//         if (!err) {
//             this.props.fetchJurisdictionList();
//             this.setState({
//                 isAddModalOpen: false,
//                 isModalOpen: true,
//                 actionSuccess:true,
//                 actionResult:'权限添加成功!'
//             });
//         }
//     }
//     render () {
//         // if(this.props.all === null) {
//         //     return <div><section className="content"><h1>Loading...</h1></section></div>
//         // }
//         return (
//             <div>
//                 <section className="content-header"><h1></h1></section>
//                 <section className="content">
//                     <div className="row">
//                         <div className="col-xs-12">
//                             <div className="box box-info">
//                                 <div className="box-header">
//                                     <h3 className="box-title">权限</h3>
//                                     <button className="btn success pull-right" onClick={this.handleAddClick.bind(this)}><i className="fa fa-plus"></i>添加权限</button>
//                                 </div>
//                                 <div className="box-body table-responsive no-padding">
//                                     <table className="table table-bordered table-hover">
//                                         <tbody>
//                                             <tr>
//                                                 <th>编号</th>
//                                                 <th>所属系统</th>
//                                                 <th>所属上级</th>
//                                                 <th>权限名称</th>
//                                                 <th>类型</th>
//                                                 <th>路径</th>
//                                                 <th>状态</th>
//                                                 <th>操作</th>
//                                             </tr>
//                                             <tr>
//                                                 <td>1</td>
//                                                 <td>1</td>
//                                                 <td>1</td>
//                                                 <td>用户管理</td>
//                                                 <td>目录</td>
//                                                 <td>/manage/role/index</td>
//                                                 <td>正常</td>
//                                                 <td>
//                                                     <button className="btn success pull-left">编辑</button>
//                                                     <button className="btn btn-primary">查询</button>
//                                                     <button className="btn btn-danger pull-right">删除</button>
//                                                 </td>
//                                             </tr>
//                                             {/* { this.renderRows() } */}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <div className="box-footer clearfix"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <Modal isOpen={this.state.isModalOpen} onRequestHide={this.hideModal}>
//                     <ModalHeader>
//                         <ModalClose onClick={this.hideModal}/>
//                         <ModalTitle>提示:</ModalTitle>
//                     </ModalHeader>
//                     <ModalBody>
//                         <p className={this.state.actionSuccess?'text-green':'text-red'}>
//                         {this.state.actionResult}
//                         </p>
//                     </ModalBody>
//                     <ModalFooter>
//                         <button className='btn btn-default' onClick={this.hideModal}>
//                         关闭
//                         </button>
//                     </ModalFooter>
//                     </Modal>

//                     <Modal isOpen={this.state.isAddModalOpen} onRequestHide={this.hideAddModal}>
//                     <ModalHeader>
//                         <ModalClose onClick={this.hideAddModal}/>
//                         <ModalTitle>添加权限</ModalTitle>
//                     </ModalHeader>
//                     <ModalBody>
//                         <AddJurisdiction addCallback={this.addJurisdictionCallback.bind(this)}/>
//                     </ModalBody>
//                     <ModalFooter>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }
// }
// function mapStateToProps(state) {
//     return {
//         all: state.jurisdiction.all
//     };
// }
// export default connect(mapStateToProps, { fetchJurisdictionList })(Jurisdiction);