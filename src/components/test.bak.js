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

    transferMsg=(msg)=> {
        this.setState({
            msg
        })
    }

    componentDidUpdate(){
        console.log('Parent update');
    }

    render(){
        const parentMethod={
            transferMsg:this.transferMsg 
        }
        return (
            <div>
                {/* <p>child msg:{this.state.msg}</p> */}
                {/* <Child_1 transferMsg ={msg=>this.transferMsg(msg)}/> */}
                <Child_1 {...parentMethod}/>
                <Child_2 msg = {this.state.msg}/>

            </div>
        )
    }

}

class Child_1 extends React.Component{
    componentDidMount(){
        setTimeout(()=>{
            this.props.transferMsg('end')
        },1000)
    }
    componentDidUpdate(){
        console.log('Child_1 update');
    }
    render(){
        return (
            <div>
               <p>child_1 component</p>
            </div>
        )
    }
}

class Child_2 extends React.Component{
    componentDidUpdate(){
        console.log('Child_2 update');
    }

    render(){
        return(
            <div>
                <p>child_2 component:{this.props.msg}</p>
                <Child_2_1></Child_2_1>
            </div>
        )
    }
}

class Child_2_1 extends React.Component{

    componentDidUpdate(){
        console.log('Child_2_1 update')
    }

    render(){
        return (
            <div>
                <p>child_2_1 component</p>
            </div>
        )
    }

}

export default Parent;
