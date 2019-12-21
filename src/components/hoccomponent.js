import React, { Component } from 'react';

function withOnChange(WrappedComponent){
    return class extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                name:""
            };
        }
        onChange = () =>{
            this.setState({
                name:"大板栗"
            })
        }
        render(){
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onChange,
                },
            };
            return <WrappedComponent {...this.props} {...newProps} />;

        }
    }
}

const NameInput = props => (<input {...props.name}/>);

export default withOnChange(NameInput);