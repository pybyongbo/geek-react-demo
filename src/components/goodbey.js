import React, { Component } from 'react';
import wrapWithUsername from 'wrapWithUsername'

class Goodbye extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         username:''
    //     }
    // }

    // componentWillMount(){
    //     let username = localStorage.getItem('username');
    //     this.setState({
    //         username:username
    //     })
    // }

    render(){
        return (
            <div>goodbye {this.props.username}</div>
        )
    }
}


Goodbye = wrapWithUsername(Goodbye);
export default Goodbye