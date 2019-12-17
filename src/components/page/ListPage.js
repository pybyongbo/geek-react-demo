import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination, Table, Input, Radio, Popconfirm, Form, Modal, Button } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchList,fetchUser,testFnAction } from './actions';
import { createSelector } from 'reselect';
import styles from "./test.css";
import iconClose from "../../images/close.jpg";
const FormItem = Form.Item;
const confirm = Modal.confirm;
const getItems = state => state.items;
const getById = state => state.byId;



const dataSourceSelector = createSelector(
    getItems,
    getById,
    (items, byId) => {
        console.log('reselect:get data source');
        if (!items) return [];
        return items.map(id => byId[id])
    }
);


//编辑弹出层
const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleModalVisible, stepFormValues, handleAfterclose,handcloseDelete } = props;
    const okHandle = () => {

        handcloseDelete();
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleModalVisible();
            form.resetFields();
            // handleAdd(fieldsValue);
        });
    };
    const formItemlayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 }
    }
    return (
        <Modal
            centered
            title="编辑信息"
            cancelText="111"
            afterClose={() => handleAfterclose()}
            visible={modalVisible}
            closeIcon={<img src={iconClose}/>}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem {...formItemlayout} label="用户ID">
                {form.getFieldDecorator('id', {
                    initialValue: stepFormValues.id,
                })(<Input disabled />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="First Name">
                {form.getFieldDecorator('first_name', {
                    initialValue: stepFormValues.first_name,
                    rules: [
                        {
                            required: true,
                            message: 'Please input your first_name',
                        },
                    ]
                })(<Input />)}
            </FormItem>

            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Last Name">
                {form.getFieldDecorator('last_name', {
                    initialValue: stepFormValues.last_name,
                })(<Input />)}
            </FormItem>
        </Modal>
    );
});

// 删除确认弹框
const Modalconfirm = (props) => {
    const { title, onConfirm, closedModal, visible, itemInfos } = props;
    return (
        <div>
            <Modal visible={visible} width={340} onCancel={closedModal} footer={null} closable={false}>
                <div className="confirmContent">
                    <h3 className="confirmTitle">{title}--{itemInfos.id}</h3>
                    <Button type="danger" className="cm-btn-danger" >
                        删除
                  </Button>
                    <Button onClick={closedModal}>取消 </Button>
                </div>
            </Modal>
        </div>
    );
}


class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            pageSize: 5,
            currentPage: 1,
            selectedRowKeys: [],
            modalVisible: false,
            stepFormValues: {},
            itemInfos: {},
            visible: false,//删除确认弹框
        };
    }

    getUserinfo = async (id)=> {
       const res = await this.props.fetchUser(id);
       console.log(res);
    }

    componentDidMount() {

        const page = this.props.match.params.page || 1;
        if (
            page !== this.props.list.page ||
            !this.getDataSource(this.props.list, this.props.list.byId).length ||
            this.props.list.needReloadList
        ) {
            const { size } = this.state;
            this.fetchData(parseInt(page, 10), size);
        }
       this.getUserinfo(1);
       testFnAction(2).then(res=>{
            const {data} = res.data;
            console.log(data)
        })
 
    }

    componentDidUpdate(prevProps) {
        const page = parseInt(this.props.match.params.page || 1, 10);
        const prevPage = parseInt(prevProps.match.params.page || 1, 10);
        const { pageSize } = this.state;
        if (prevPage !== page && !this.props.list.fetchListPending) {
            this.fetchData(page, pageSize);
        }
    }

    fetchData = (page, pageSize) => {
        this.props.fetchList(page, '', pageSize);
    }

    getDataSource = dataSourceSelector;


    handleDelete = (record) => {

        console.log(record.id);
        this.handleClickConfirm(record);

    }

    closedModal = e => {
        this.setState({ visible: false });
    };



    getColumns() {
        return [
            {
                title: 'User Face',
                dataIndex: 'avatar',
                key: 'avatar',
                width: '200px',
                render: (record, text) => <img style={{ width: 50, height: 50, borderRadius: '50%' }} src={record}></img>
            },
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'first_name',
                width: '200px',
                render: (firstName, rec) => <Link to={`/user/${rec.id}`}>{firstName}</Link>
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'last_name',
                width: '200px'
            },
            {
                title: 'operate',
                dataIndex: 'opt',
                key: 'opt',
                width: '220px',
                render: (text, record) => <div><a href="javascript:;" onClick={() => this.handleModalVisible(true, record)} style={{ marginRight: '10px' }}>Edit</a><Popconfirm title="你确认要删除该项吗?" onConfirm={() => this.handleDelete(record)}>
                    <a href="javascript:;">Delete</a>
                </Popconfirm></div>
            }
        ];
    }

    rowSelection = () => {
        const { selectedRowKeys } = this.state;
        return {
            columnWidth: 65,
            selectedRowKeys,
            hideDefaultSelections: true,
            type: Radio,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys })
            },
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        console.log(changableRowKeys);
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            getCheckboxProps: (record) => ({
                disabled: record.first_name === 'George' || record.first_name === 'Janet', // Column configuration not to be checked
            }),
            onSelect: (changeable, rowkeys) => {
                console.log(changeable.id, rowkeys)
            }
        }
    }

    handleSearch = keyword => {
        const { page, pageSize } = this.props.list;
        this.props.fetchList(1, keyword, pageSize);
    };

    handlePageChange = newPage => {
        this.props.history.push(`/ListSample/${newPage}`);

    };

    handleModalVisible = (flag, record) => {
        this.setState({
            modalVisible: !!flag,
            stepFormValues: record || {},
        }, () => {
            // console.log(this.state.stepFormValues)
        });
    };

    handcloseDelete = ()=>{
        this.setState({
            visible:true
        })
    }

    handleAfterclose = () => {
        console.log("关闭后回调函数");
    }

    handledelModalVisible = (flag, record) => {
        this.setState({
            visible: !!flag,
            itemFormValues: record || {},
        }, () => {

        });
    };
    handleClickConfirm = (record) => {
        this.setState({
            visible: true,
            itemInfos: record || {},
        });
    };

    onShowSizeChange = (current, size) => {
        this.fetchData(current, size);
        this.setState({
            pageSize: size
        }, () => {
            console.log(current, size);
        });
    };

    render() {

        const parentMethods = {
            stepFormValues: this.state.stepFormValues, //传递属性值
            handleModalVisible: this.handleModalVisible, //传递方法
            handleAfterclose: this.handleAfterclose,
            handcloseDelete:this.handcloseDelete//传递方法

        };

        const delDialogMethods = {

            itemInfos: this.state.itemInfos,
            closedModal: this.closedModal,
            handleClickConfirm: this.handleClickConfirm,
        }

        if (this.props.list.fetchListError) {
            return <div>{this.props.list.fetchListError.error.message}</div>;
        }

        if (!this.props.list.items || !this.props.list.items.length) return 'loading...';
        const { page, total, pageSize, keyword } = this.props.list;

        return (
            <div>

                <h2 style={{ marginBottom: '20px' }}>分页组件:Table组件的属性配置和单独的分页组件渲染</h2>
                <Input.Search
                    value={this.state.search}
                    onChange={e => this.setState({ search: e.target.value })}
                    style={{ width: '200px' }}
                    onSearch={this.handleSearch}
                />
                <br />
                <Table
                    dataSource={this.getDataSource(this.props.list)}
                    rowSelection={this.rowSelection()}
                    columns={this.getColumns()}
                    style={{ width: '680px' }}
                    rowKey="id"
                    loading={this.props.list.fetchListPending}
                    pagination={{
                        position: 'top',
                        current: page,
                        pageSize,
                        total,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: this.handlePageChange,
                        showTotal: (total, range) => `共${total}条记录,每页显示`,
                        pageSizeOptions: ['5', '10', '20'],
                        onShowSizeChange: this.onShowSizeChange
                    }}
                />
                {/* 编辑信息弹出层 */}
                <CreateForm
                    {...parentMethods}
                    modalVisible={this.state.modalVisible} />

                {/* 删除确认弹出层 */}
                <Modalconfirm 
                title="删除该资料卡？" 
                {...delDialogMethods} 
                visible={this.state.visible}
               
                 >

                </Modalconfirm>
                <div className={styles.test}>test</div>
                <br />
                <Pagination current={page} onChange={this.handlePageChange} onShowSizeChange={this.onShowSizeChange} total={total} pageSize={pageSize} pageSizeOptions={['5', '10', '20']} showSizeChanger showQuickJumper />
                <br/>
                <Button type="primary" size="large">按钮</Button>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        list: state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchList,fetchUser,testFnAction }, dispatch);
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ListPage)
);
