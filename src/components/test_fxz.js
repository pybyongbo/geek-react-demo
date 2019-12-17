import React, { Component } from 'react';
import { Checkbox,Button,Radio,Switch,Divider, Form,Input, Icon} from 'antd';

const FormItem = Form.Item;

class Parent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           msg:'start'
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                msg:'end'
            })
        },1000);
    }

    render(){
        return <Child_1 msg={this.state.msg}/>
    }

}

class Child_1 extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.msg}</p>
                <Child_1_1 {...this.props}/>
            </div>
        )
    }
}

class Child_1_1 extends React.Component{
    render(){
        return <p>{this.props.msg}</p>
    }
}

export default Parent;
