import React, { Component } from 'react';


  class LoginButton extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        const {handleLoginClick,handleLogoutClick,isLoggedIn} = this.props;
        return (
            <button onClick={isLoggedIn?handleLogoutClick:handleLoginClick}>
               {isLoggedIn?'Logout':'Login'}
            </button>
        )
    }

  }
  
//   function LogoutButton(props) {
//     return (
//       <button onClick={props.onClick}>
//         Logout
//       </button>
//     );
//   }

  function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }

  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

class LoginControl extends React.Component{

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn:false
        }
    }

    handleLoginClick(){
        this.setState({
            isLoggedIn:true
        })
    }

    handleLogoutClick(){
        this.setState({
            isLoggedIn:false
        })
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        //let button;
        const comMethod ={
            isLoggedIn:this.state.isLoggedIn,
            handleLogoutClick:this.handleLogoutClick,
            handleLoginClick:this.handleLoginClick
        }

        // if(isLoggedIn) {
        //     // onClick={this.handleLogoutClick}
        //     // button = <LogoutButton  {...comMethod}/>;
        //     button = <LoginButton  {...comMethod}/>;
        // } else {
        //     // onClick={this.handleLoginClick}
        //     button = <LoginButton  {...comMethod}/>;
        // }
        //button = <LoginButton  {...comMethod}/>;

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {/* {button} */}
                <LoginButton  {...comMethod}/>
            </div>

        )
    }

}

export default LoginControl;