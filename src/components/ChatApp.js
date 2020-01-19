import React from 'react';
// import './ChatApp.css';
import styles from "./ChatApp.css";

import { Form, Select } from 'antd';
const { Option } = Select;

const data = [
    { name: '全部', value: 0 },
    { name: '点我达', value: 1 },
    { name: '点我吧', value: 2 },
    { name: '饿了么', value: 3 },
]

class Selectmodal extends React.Component {

    selectChange = (nextValues) => {
        const { getFieldProps, setFieldsValue, getFieldValue } = this.props.form;
        let tragetValues = [];
        const nowValues = getFieldValue('name') || [];

        if (nowValues.length > nextValues.length) {
            tragetValues = nextValues;
        } else {
            const selectValue = nextValues.find(nv => nowValues.indexOf(nv) === -1)
            if (selectValue === '0') {
                tragetValues = ['0']
            } else {
                tragetValues = nextValues.filter(x => x !== '0')
            }
        }
        setFieldsValue({ name: tragetValues })

    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <Select
                    {...getFieldProps('name', {

                    })}
                    style={{ width: 300 }}
                    mode="multiple"
                    onChange={this.selectChange}
                >
                    {
                        data.map((item) => <Option key={item.value}>{item.name}</Option>)
                    }
                </Select>
            </div>
        )
    }

}
const WrappedSelectmodal = Form.create()(Selectmodal);
class MessageList extends React.Component {
    state = {
        styleobj: {
            color: 'red',
            marginLeft: '10px'
        }
    }
    render() {
        return (
            <ul>
                {this.props.messages.map((msg, index) => (
                    <li key={index}>
                        {msg}
                        <a onClick={() => this.props.delItem(index)} style={this.state.styleobj}>
                            删除
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export class ChatApp extends React.Component {
    state = {
        messages: [],
        inputMsg: '',
        time: new Date()

    };
    componentDidMount() {
        let aToCasesA = ['SUIBICHUANJI', 'ITCLANCODER', 'ZHONGGUO', 'BEIJING', 'AGE'];
        console.log(this.toLowerCase(aToCasesA));
        this.timerID = setInterval(() => this.tick(), 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date()
        })
    }

    handleInput = evt => {
        this.setState({
            inputMsg: evt.target.value
        });
    };

    onKeyUp = e => {
        e.keyCode === 13 && this.handleSend();
    };

    handleSend = e => {

        var itemArray = this.state.messages;
        if (this._inputElement.value) {
            itemArray.push(this._inputElement.value);
            this.setState({
                messages: itemArray,
                inputMsg: ''
            });
        } else {
            alert("文本框值不能为空")
        }

    };

    delItem = index => {

        this.state.messages.splice(index, 1);
        this.setState({
            messages: this.state.messages
        });
    };

    /**
    * 需求:编写一个函数，处理传入包含大写字符串的数组，返回包含相同小写字符串的数组
    * 声明式编程实现toLowerCase
    * 输入数组的元素传递给map函数，然后返回包含小写值的新数组
     */
    toLowerCase = arr => {
        return arr.map((item) => {
            return item.toLowerCase()
        })
    }

    /** 或者这种写法也可以
        toLowerCase = arr => arr.map(function(item) {
            return item.toLowerCase();
            })
    */


    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} delItem={this.delItem} />
                <div>
                    <input
                        ref={a => (this._inputElement = a)}
                        value={this.state.inputMsg}
                        onChange={this.handleInput}
                        onKeyUp={this.onKeyUp}
                    />
                    <button onClick={this.handleSend}>Send</button>
                </div>
                <h2 className={styles.test} style={{ marginLeft: '5px', marginTop: '10px' }}>你好,现在时间是:{this.state.time.toLocaleString()}</h2>

                <WrappedSelectmodal />
            </div>
        );
    }
}
