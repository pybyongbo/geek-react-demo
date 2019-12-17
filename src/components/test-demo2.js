import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Input} from 'antd';
class Child extends React.Component{

    render(){
        return (
            <div>
                <h1>子组件获取到的props: {this.props.name}</h1>
                <button onClick={() => { this.props.changeName()}}>change Name</button>
            </div>
        )
    }

}

class Parent extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'Jack'
        }
    }
    changeName =()=>{
        this.setState({
            name:'Rose'
        })
    }

    render(){
        return (
            <div>
                <Child name = {this.state.name} changeName={this.changeName} title="title"/>
            </div>
        )
    }
}

class Partner1 extends React.Component{

    render(){
        return (
            <div>
                <h1>子组件获取到的props: {this.props.num}</h1>
                <Button onClick={() => { this.props.add() } }>加1</Button>
            </div>
        )
    }
}

class Partner2 extends React.Component{

    render(){
        return (
            <div>
                <h1>子组件获取到的props: {this.props.num}</h1>
                <Button type="primary" onClick={() => { this.props.minum() } }>减1</Button>
            </div>
        )
    }
}

class Father extends React.Component{
     
    constructor(props){
        super(props);
        this.state={
            name:'Jack',
            num:1
        }
    }

    getGreeting = ()=> 'Welcome to React!'

    add = ()=>{
        this.setState({
            num:this.state.num+1
        })
    }
    minum = () =>{
        this.setState({
            num:this.state.num-1
        })
    }

    render(){
        var users = [
            { name: 'Robin', isDeveloper: true },
            { name: 'Markus', isDeveloper: false },
          ];
        return (
            <div>
                <h1>{this.getGreeting()}</h1>
                <Partner1 num={this.state.num} add={this.add}/>
                <Partner2 num={this.state.num} minum={this.minum}/>
                <br/><br/>
                <ul>
                    {users
                    // .filter(user => user.isDeveloper)
                    .map(user => <li>{user.name}</li>)
                    }
                </ul>
            </div>
        )
    }

}

// export default Parent;
export default Father;
