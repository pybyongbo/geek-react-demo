import React, { Component } from 'react';
import wrapWithUsername from 'wrapWithUsername'

class Welcome extends Component{
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
            <div>welcome {this.props.username}</div>
        )
    }
}

Welcome = wrapWithUsername(Welcome);
export default Welcome