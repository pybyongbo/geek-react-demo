import React from 'react';

import { Form, Input, Select, Row, Col } from 'antd';
const { Option } = Select;

class AccountInput extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
                addonBeforeText: nextProps.value.custPayType === 'PT_1' ? '货到' : '票到',
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            custPayType: value.selectfieldKey || '', //账期方式列
            custPayDate: value.inputfieldKey || '', //账期天数
            addonBeforeText: ''
        };
    }

    handleChange = (type, value) => {
        const { inputfieldKey } = this.props;
        this.setState({
            [type]: value,
            addonBeforeText: value === 'PT_1' ? '货到' : '票到'
        }, () => {
            //回调函数里面设置表单字段的值
            value && value !== 'PT_2' && this.props.form.setFieldsValue({
                [inputfieldKey]: `${value && value !== 'PT_2' ? '' : value}`,
            });
            console.log(this.state)
        });
        console.log('value', value)
        this.triggerChange({
            [type]: value,

        });
    }

    triggerChange = changedValue => {
        const { onChange } = this.props;
        let accoutInfo = {
            ...this.state,
            ...changedValue
        }
        if (onChange) {
            if (accoutInfo.custPayType === "PT_2") {
                //选择款到发货,没有文本框的时候,返回对象没有custPayDate字段
                onChange({
                    custPayType: accoutInfo.custPayType,
                    addonBeforeText: accoutInfo.addonBeforeText
                })
            } else if (accoutInfo.custPayType === undefined) {
                //非必填项,清除操作,对应字段传入空值.
                onChange({
                    custPayType: '',
                    addonBeforeText: ''
                })
            } else {
                onChange({
                    custPayType: accoutInfo.custPayType,
                    custPayDate: accoutInfo.custPayDate,
                    addonBeforeText: accoutInfo.addonBeforeText
                })
            }
        }
    };

    render() {
        const { custPayType, custPayDate, addonBeforeText, } = this.state;
        // console.log(111, custPayType)
        const { selectfieldKey, inputfieldKey, form: { getFieldDecorator } } = this.props;
        return (
            <Row>
                <Col span={8}>
                    <Form.Item>
                        {getFieldDecorator(selectfieldKey, {
                            initialValue: custPayType || undefined
                        })(
                            <Select
                                onChange={(value) => this.handleChange('custPayType', value)}
                                placeholder="请选择账期"
                            >
                                <Option value="PT_1">货到付款</Option>
                                <Option value="PT_2">款到发货</Option>
                                <Option value="PT_3">票到付款</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item>
                        {(custPayType && custPayType !== "PT_2") && (getFieldDecorator(inputfieldKey, {
                            initialValue: custPayDate || undefined,
                            rules: [{ required: true, message: '请输入天数' }],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\D/g, '')
                            },
                        })(<Input
                            addonBefore={addonBeforeText}
                            addonAfter="天内付款"
                        />))}
                    </Form.Item>
                </Col>

            </Row>
        )
    }

}


export default AccountInput;