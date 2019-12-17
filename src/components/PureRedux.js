import React from 'react';
import {createStore,combineReducers,bindActionCreators} from "redux"
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'

function run(){

    const initialState = {count:0};

    const counter = (state=initialState,action)=>{
        switch(action.type) {

            case "PLUS_ONE":
            return {count:state.count+1};
            case "MINUS_ONE":
            return {count:state.count-1};
            case "CUSTOM_COUNT":
            return {
              count: state.count + action.payload.count
            };
          default:
            break;
        }
        return state;
    }

    const todos = (state={}) => state;


    const store = createStore(
        combineReducers({
            todos,
            counter
        }),
        composeWithDevTools(
            )
        

    );

    function plusOne(){
        return {
            type:"PLUS_ONE"
        }
    }

    function minusOne(){
        return {
            type:"MINUS_ONE"
        }
    }

    function customCount(count){

        return {
            type:"CUSTOM_COUNT",
            payload:{count}
        }
    }

    plusOne = bindActionCreators(plusOne,store.dispatch);

    store.subscribe(()=>console.log(store.getState()));

    plusOne();
    store.dispatch(minusOne());

    store.dispatch(customCount(5));
}

export default () => (
    <div>
      <button onClick={run}>Run</button>
      <p>* 请打开控制台查看运行结果</p>
    </div>
  );