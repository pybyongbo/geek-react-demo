import React from 'react';
import { bindActionCreators, createStore } from 'redux';

import { Provider, connect } from 'react-redux';

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = { count: 0 };

const counter = (state = initialState, action) => {
    switch (action.type) {
        case 'PLUS_ONE':
            return { count: state.count + 1 };
        case 'MINUS_ONE':
            return { count: state.count - 1 };
        case 'CUSTOM_COUNT':
            return { count:state.count+ action.payload };
        case 'RESET':
            return {count:0}
        default:
            break;
    }

    return state;
};

const store = createStore(counter,composeWithDevTools());
//const store = createStore(counter,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function plusOne() {
    return {
        type: 'PLUS_ONE'
    };
}

function minuOne() {
    return {
        type: 'MINUS_ONE'
    };
}

function reset() {
    return {
        type: 'RESET'
    };
}

function customCount() {
    return {
        type: 'CUSTOM_COUNT',
        payload:5
    };
}

export class Counter extends React.Component {
    render() {
        const { count, plusOne, minuOne,customCount,reset } = this.props;
        return (
            <div className="counter">
                <button className="btn" onClick={minuOne}>
                    -
                </button>
                <div className="counter-input">{count}</div>
                <button className="btn" onClick={plusOne}>
                    +
                </button>

                <button className="btn" onClick={customCount} style={{marginLeft:'10px'}}>
                    加5
                </button>

                <button className="btn" onClick={reset} style={{marginLeft:'10px'}}>
                   重置
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

// function mapDispatchToProps(dispatch) {
const mapDispatchToProps = (dispatch,ownProps)=>{
    console.log(ownProps)
    return bindActionCreators({ plusOne, minuOne,customCount,reset }, dispatch);
    
}

// const mapDispatchToProps = (dispatch)=>{
//     return {
//         plusOne:()=>{
//             dispatch(plusOne());
//         },
//         minuOne:()=>{
//             dispatch(minuOne());
//         },
//         customCount:()=>{
//             dispatch(customCount());
//         },
//         reset:()=>{
//             dispatch(reset());
//         }
//     }
// }



const ConnectedCounter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default class CounterSample extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <ConnectedCounter />
            </Provider>
        );
    }
}
