import React from 'react';
import { Button, Divider, Form, Input, Select, Radio, message, Alert } from 'antd';
import { Link } from "react-router-dom";
import './testForm.css'
const { Option } = Select;
class testForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: "horizontal",
            errorText: ""
        }
    }
    handleFormLayoutChange = e => {
        this.setState({
            formLayout: e.target.value
        })
    }
    // 自定义校验函数，要求输入的是一个正整数
    checkNumberString = (rule, value, callback) => {
        const number = Number(value);

        if (!Number.isInteger(number) || number < 1) {
            // 如果需要返回 error msg，就把它传给 `callback()`
            callback('号段必须为数字');
        } else {
            // 如果通过校验，调用无参数的 `callback()` 即可
            callback();
        }
    };

    reset = (e) => {
        e.preventDefault();
        message.success('重置表单字段值成功~');

        var _that = this;
        setTimeout(function () {

            _that.props.form.resetFields();
            _that.setState({
                errorText: ''
            })

        }, 1000)


    }

    setCodeval = () => {
        this.props.form.setFieldsValue({
            code: 123456,
        }, () => {
            console.log("after");
        }, console.log("before"));
    }

    alertTips = () => {

        return '123'
    }

    handleSubmit = e => {
        e.preventDefault();
        const { getFieldError, getFieldsError, setFields, getFieldValue, getFieldsValue } = this.props.form;
        // console.log(typeof getFieldValue('code'));
        // return;
        this.props.form.validateFields({ first: true }, (err, values) => {
            console.log(values);
            // console.log(getFieldsError().password[0], getFieldsError().username[0]);
            // if(!err){
            //     console.log(values);
            // }
            if (!values.username) {
                this.setState({
                    errorText: '用户名不能为空'
                })
            } else if (!values.password) {
                this.setState({
                    errorText: '用户密码不能为空'
                })
            } else if (!values.phone) {
                this.setState({
                    errorText: '手机号码不能为空'
                })
            } else if (!values.code) {
                this.setState({
                    errorText: '号段不能为空'
                })
            } else {
                this.setState({
                    errorText: ''
                })
                console.log(values);

            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ?
            {
                labelCol: {
                    span: 4
                },
                wrapperCol: {
                    span: 14
                }
            } : null;

        const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        const messageInfo = (
            <div>
                请完善你们的企业信息 >><a href="/message/baseinfo">我要完善</a>;
            </div>
        );
        return (
            <div className="testForm">

                <Alert
                    // banner={true}
                    message={messageInfo}
                    // description="Detailed description and advice about successful copywriting."
                    type="warning"
                    // closable
                    showIcon
                    // closeText="Closed" 
                    style={{ marginBottom: '20px' }}
                />
                <Form layout="horizontal" labelAlign="right" colon={false} onSubmit={this.handleSubmit}>

                    <Form.Item label="Form Layout" {...formItemLayout}>
                        <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                            <Radio.Button value="horizontal">Horizontal</Radio.Button>
                            <Radio.Button value="vertical">Vertical</Radio.Button>
                            <Radio.Button value="inline">Inline</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="用户名" {...formItemLayout} help="Should be combination of numbers & alphabets">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input placeholder="Username" />,
                        )}
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input.Password placeholder="password" />,
                            // <Input type="password" placeholder="password" />,
                        )}
                    </Form.Item>

                    <Form.Item label="电话" {...formItemLayout}>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>

                    <Form.Item label="号段" {...formItemLayout} hasFeedback validateStatus="success">
                        {getFieldDecorator('code', {
                            // initialValue:123456,
                            rules: [{
                                required: true, type: 'number', message: '只支持数字类型', transform: (value) => {
                                    return Number(value)
                                }
                            }],
                        })(
                            <Input placeholder="请输入号段" />,
                        )}
                    </Form.Item>

                    <div className="errorTips">
                        <p>{this.state.errorText}</p>
                    </div>
                    <Form.Item>
                        <div className="butgroup">
                            <Button type="primary" htmlType="submit" style={{ marginRight: '30px' }}>
                                登录
                        </Button>

                            <Button onClick={this.reset} style={{ marginRight: '30px' }}>
                                Reset
                        </Button>

                            <Button type="primary" onClick={this.setCodeval}>
                                设置值
                        </Button>

                            <Button type="primary" onClick={this.alertTips}>
                                提示信息
                        </Button>
                        </div>
                    </Form.Item>
                </Form>

                <Divider></Divider>

            </div>

        );
    }
}

export default Form.create()(testForm);

