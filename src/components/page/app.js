import React from 'react';
import axios from 'axios';

import { bindActionCreators, createStore, applyMiddleware } from 'redux';

import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import { Pagination, Table, Input } from 'antd';
import ListPage from './ListPage';

import DetailPage from './DetailPage';
import reducer from './reducer';

import { LocaleProvider } from 'antd';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

require('./page.css');


const createLogger = require('redux-logger').createLogger;

const logger = createLogger({ collapsed: true });

const store = createStore(reducer,{},composeWithDevTools(applyMiddleware(thunk, logger)));

export default class ListPageSample extends React.Component {
    
    render() {
        const sysConfig = {
            locale:zh_CN,
            // prefixCls:'aaa',
            // autoInsertSpaceInButton:false
        };
        return (
            <ConfigProvider {...sysConfig}>
            <Provider store={store}>
                <Router>
                    <div className="list-page-app">
                        <Route path="/ListSample/:page?" component={ListPage} />
                        <Route path="/user/:userId?" component={DetailPage} />
                    </div>
                </Router>
            </Provider>
           </ConfigProvider>
        );
    }
}
