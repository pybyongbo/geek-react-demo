import React from "react";

export default class Clock extends React.Component {

    constructor(props){
        super(props);
        console.log("Clock constructed")
        this.state = {date:new Date()}
    }
   
    componentDidMount(){
        console.log("Clock will mount");
        this.timerID = setInterval(()=>this.tick(),1000)
    }

    componentWillUnmount(){
        console.log("Clock will unmount");
        clearInterval(this.timerID);

    }

    componentDidUpdate(){
        console.log("Clock did update")
    }

    tick(){
        this.setState({
            date:new Date()
        })
    }

    render(){

        return (

            <div>
                <h1>Hello World!</h1>

                <p>It is {this.state.date.toLocaleTimeString()}.</p>
            </div>
        )

    }

}