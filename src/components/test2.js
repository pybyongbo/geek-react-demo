import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input,Button,Dropdown,Menu,Icon,Row,Col,Tooltip,DatePicker } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const {MonthPicker,RangePicker} = DatePicker;

const Search = Input.Search;
const dateFormat = 'YYYY-MM-DD';
const Btn = props => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );

export default class Form extends React.Component {
    constructor(){
    super();
    this.state = { username: '', email: '',clicks:0 };


    }

    componentDidMount =()=>{
        // this._inputElement.focus();
    }
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        console.log(`${this.state.username} ${this.state.email}`);
        // alert(this.state.username);
        // this._inputElement.value = '';
        e.preventDefault();
    };

    focus = ()=>{
        this.textInput.focus();
    }

    handleMenuClick = (e)=>{
        console.log("click",e);
    }

    handleClick=()=> {
        this.setState({ clicks: this.state.clicks + 1 })
      }

    disabledDate=(current) =>{
    // Can not select days before today and today
    return current && current > moment().startOf('day');
    }
      
    onChangeDate = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">1st item</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
           </Menu>
          )
        return (
            <div className="formtest basiclayout">

                <input type="text" ref= {input=>this.textInput = input} />
                <button onClick = {this.focus} style={{color:"#fff",height:"38px",marginRight:'10px'}}>Focus the text input</button>

                <DatePicker 
                locale={locale} 
                onChange={this.onChangeDate} 
                format={"YYYY-MM-DD"}
                disabledDate={this.disabledDate}/>

            <RangePicker
                onChange={this.onChangeDate} 
                defaultValue={[moment(moment(new Date()).subtract(1,'months').format('YYYY-MM-DD HH:mm:ss'), dateFormat), moment(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), dateFormat)]}
                format={dateFormat}
                />

                <br/>
                <br/>
                <Search
                style={{width:'360px',marginTop:10,marginBottom:20}}
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
                />

                <Input.Group compact size="default" >
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                    <Tooltip title="Extra information">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                />
                <Input />
                </Input.Group>

                <br/>

                <Button type="primary" loading={true}>button</Button>
                <Button type="danger" loading={true}>button</Button>
                <Button htmlType='submit'>Default</Button>
                <Button type="dashed" href="http://blog.901web.com">button</Button>

                <Button type="primary" icon="search"></Button>
                <Button icon="search">Search</Button>

                <Dropdown overlay={menu}>
                    <Button>
                        Action <Icon type="down"/>
                    </Button>
                </Dropdown>

                <br/>
                <br/>
                <br/>
                <br/>

                <Btn
                onClick = {this.handleClick}
                text = {`You've clicked me ${this.state.clicks} times!`}
                />

                <Icon type="home" spin={false} style={{fontSize:'24px',marginLeft:'10px'}} />

               
                <Row>
                    <Col span={12}>col-12</Col>
                    <Col span={12}>col-12</Col>
                </Row>

                <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                </Row>

                <Row type="flex" justify="start">
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>

                </Row>
            </div>
        );
    }
}
                                                                                