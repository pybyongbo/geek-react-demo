import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input,Button,Dropdown,Menu,Icon,Row,Col ,Modal, Radio,Form} from 'antd';
const { TextArea } = Input;

// console.log(Input.TextArea);
const CollectionCreateForm = Form.create({})(
    class extends React.Component{
        render(){
            const {
                visible,onCancel,onCreate,form
            } = this.props;
            console.log(this.props)

            const {getFieldDecorator} = form;
            return (
                <Modal 
                visible={visible}
                title="create a new collection"
                okText="create"
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout="vertical">
                    <Form.Item label="Title">
                        {
                            getFieldDecorator('title',{
                                rules:[{
                                    required:true,
                                    message:'Please input the title of collection!'
                                }]
                            })(
                                <Input/>
                            )
                        }
                    </Form.Item>

                    <Form.Item label="Description">

                        {
                            getFieldDecorator('description',{
                                rules:[{
                                    required:true,
                                }] 
                            })(<TextArea
                                style={{ minHeight: 32 }}
                                placeholder='请输入描述'
                                rows={4}
                              />)
                        }
                    
                    </Form.Item>

                    <Form.Item className="collection-create-form_last-form-item">
                        {
                            getFieldDecorator('modifier',{
                                initialValue:'public'
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>
                            )
                        }

                    </Form.Item>



                </Form>

                </Modal>
            )
        }

    }

)


class CollectionsPage extends React.Component{
    state =  {
        visible:false
    };
    showModal = ()=>{
        this.setState({
            visible:true
        })
    }

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false },()=>{
            form.resetFields();
        });
      }

    handleCreate = ()=>{
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }

        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
      }

    render(){
        return (
            <div className="formtest">
                <Button type="primary" onClick={this.showModal}>
                    New Collection
                </Button>
                <CollectionCreateForm
                wrappedComponentRef={(formRef)=>this.formRef = formRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                ></CollectionCreateForm>
            </div>
        )
    }
}

export default CollectionsPage;