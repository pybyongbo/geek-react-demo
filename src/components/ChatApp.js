import React from 'react';
// import './ChatApp.css';
import styles from "./ChatApp.css";
class MessageList extends React.Component {
    state = {
      styleobj:{
        color: 'red',
        marginLeft:'10px'
      }
    }
    render() {
        return (
            <ul>
                {this.props.messages.map((msg, index) => (
                    <li key={index}>
                        {msg}
                        <a onClick={()=>this.props.delItem(index)} style={this.state.styleobj}>
                            删除
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export class ChatApp extends React.Component {
    state = {
        messages: [],
        inputMsg: '',
        time: new Date()

    };
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    };

    componentWillUnmount(){
      clearInterval(this.timerID);
    }

    tick(){
      this.setState({
        time:new Date()
      })
    }

    handleInput = evt => {
        this.setState({
            inputMsg: evt.target.value
        });
    };

    onKeyUp = e=>{
        e.keyCode === 13 && this.handleSend();
    };

    handleSend = e => {

        var itemArray = this.state.messages;
        if(this._inputElement.value) {
          itemArray.push(this._inputElement.value);
          this.setState({
              messages: itemArray,
              inputMsg: ''
          });
        } else {
            alert("文本框值不能为空")
        }

    };

    delItem = index => {
    
        this.state.messages.splice(index, 1);
        this.setState({
            messages: this.state.messages
        });
    };

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} delItem={this.delItem} />
                <div>
                    <input
                        ref={a => (this._inputElement = a)}
                        value={this.state.inputMsg}
                        onChange={this.handleInput}
                        onKeyUp = {this.onKeyUp}
                    />
                    <button  onClick={this.handleSend}>Send</button>
                </div>
                <h2 className={styles.test} style={{marginLeft:'5px',marginTop:'10px'}}>你好,现在时间是:{this.state.time.toLocaleString()}</h2>
            </div>
        );
    }
}
