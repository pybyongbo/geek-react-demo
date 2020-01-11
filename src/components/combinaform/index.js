import React from 'react';

import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;

class AccountInput extends React.Component {

    handleChange = (type,value) => {
        this.triggerChange({[type]:value});
        console.log(222,type,value);
        // if(type==="cusPayType") {
        //     this.triggerChange({value});
        // } else {
        //     this.triggerChange({"cusPayDate":value});
        // }
    }

    triggerChange = changedValue => {
        const { onChange, value } = this.props;
        console.log(111,changedValue);
        if (onChange) {
            onChange({
                ...value,
                ...changedValue,
            });
        }
    };

    render() {

        const { size, value } = this.props;
        console.log('props',this.props)
        return (
            <div>
                <Select
                    // value={value.cusPayType}
                    style={{ width: '32%' }}
                    onChange={(e)=>this.handleChange('cusPayType',value)}
                >
                    <Option value="PT_1">货到付款</Option>
                    <Option value="PT_2">款到发货</Option>
                    <Option value="PT_3">票到付款</Option>
                </Select>
                <Input
                    type="text"
                    value={value.cusPayDate}
                    onChange={(e)=>this.handleChange('cusPayDate',e.target.value)}
                    style={{ width: '65%', marginRight: '3%' }}
                />
            </div>
        )
    }

}


export default AccountInput;