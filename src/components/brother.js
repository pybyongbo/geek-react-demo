import React from "react";
import ReactDOM from "react-dom";
import { Button, Divider } from "antd";

//父组件
class MyContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        list: ["item1", "item2","item3","item4"],
        curItem: "item1"
      };
    }
    //改变curItem的回调函数
    changeItem = item => {
      this.setState({
        curItem: item
      });
    };

    addItem = ()=>{
        var {list} = this.state;
        // var itemLast = list[list.length-1];
        // var num = itemLast.replace(/[^\d]/g,'')*1+1;
        list.push('item'+(list.length+1));
        console.log(list);
        this.setState({
            list
        })
    }

    getparentState = ()=>{
        console.log(this.state.list)
        return this.state.list
    }
  
    render() {
      return (
        <div>
          <h1>React中兄弟组件通讯 <Button type="danger" onClick={this.addItem} style={{verticalAlign:'6px'}}>Add Item</Button></h1>
          <Divider />
          The curItem is :{this.state.curItem}
          <List list={this.state.list} curItem={this.state.curItem} />
          <Divider />
          <SelectionButtons changeItem={this.changeItem} getparentState={this.getparentState}/>
          <p style={{marginTop:'30px',color:'red'}}>(列表组件和按钮组件就是兄弟组件)</p>
        </div>
      );
    }
  }
  //列表组件
class List extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      var selectedStyle = {
        color: "white",
        background: "red"
      };
  
      return (
        <ul>
          {//方法1:改用箭头函数.
          this.props.list.map((item, index) => {
            let itemStyle = item == this.props.curItem ? selectedStyle : {};
            return (
              <li key={index} style={itemStyle}>
                I am {item}, click me!
              </li>
            );
          })
          }
        </ul>
      );
    }
  }
  //按钮组件
class SelectionButtons extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    onClickItem = item => {
      this.props.changeItem(item);
      //console.log(this.props.getparentState());
    };
  
    render() {
      return (
        <div>
          {/* <Button
            type="primary"
            onClick={() => {
              this.onClickItem("item1");
            }}
            style={{ marginRight: "10px" }}
          >
            item1
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.onClickItem("item2");
            }}
          >
            item2
          </Button> */}

          {//循环按钮组
          this.props.getparentState().map((item, index) => {

            return (
                <Button
                key={index}
                type="primary"
                onClick={() => {
                  this.onClickItem(item);
                }}
                style={{ marginRight: "10px" }}
              >{item}</Button>
            );
          })}

        </div>
      );
    }
}
  
  export default MyContainer;