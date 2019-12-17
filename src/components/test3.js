import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class HelloWorld extends React.Component{
    render(){
        console.log(this.props);

        return (
            
            // <div data-title={this.props.title}>{JSON.stringify(this.props)}</div>
            <div>
                {
                this.props.children.map(function(child) {
                        return child;
                })
                }
            </div>
        )
    }
}


class Form extends React.Component{
    constructor(props){
    super(props);

    }

    render() {

        return (
            <div className="formtest">
                <HelloWorld title="this is title">
                    <p>content</p>
                    <span>1</span>
                </HelloWorld>
            </div>
        );
    }
}

export default Form;
