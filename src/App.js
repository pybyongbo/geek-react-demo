import React, { Component } from 'react';
import './App.css';

// import { Layout, Menu, Icon, Button, Breadcrumb } from 'antd';

import { TabSelectorSample } from './components/TabSelector';
import { ChatApp } from './components/ChatApp';

import LocaleSample from './components/LocaleSample';
import clock from './components/Clock';
import PureRedux from './components/PureRedux';

import CounterSample from './components/Counter';
import RouterSample from './components/RouterSample';
import RouterParams from './components/RouterParams';

import NestedRoute from './components/NestedRoute';

import FormSubmit from './components/FormSubmit';

import FormSubmitAntd from './components/FormSubmitAntd';

import test from './components/test';

import ListSample from './components/page/app';

import DynamicForm from './components/DynamicForm';

import MultipleRequest from './components/MultipleRequest';

import WizardSample from './components/step/App';

import Layout1 from './components/Layout/layout1';
import Layout2 from './components/Layout/layout2';
import LayoutResize from './components/Layout/layoutresize';

import BrotherCom from './components/brother.js'

import formtest from './components/formtest.js'
import basicTest from './components/test2.js'

import testDemo1 from './components/test-demo1'
import testDemo2 from './components/test-demo2'

import testHooc from "./components/test-hooc"

import testForm from "./components/testForm"

import countdown from "./components/countdown"

import hoccomponent from "./components/hoccomponent.js"

// import useState1 from "./components/useState1.js"


import familylayout from "./components/GE-Healthcar-Code.js"

// import PortalSample from './components/dialog/portalSample';

import hooksCheckbox from "./components/hooksCheckbox"

const styles = {
    fontFamily: 'sans-serif',
    paddingLeft: '250px'
};

const routeMap = {
    chat: ChatApp,
    tabSelector: TabSelectorSample,
    localeSample: LocaleSample,
    clock: clock,
    pureRedux: PureRedux,
    counter: CounterSample,
    RouterSample: RouterSample,
    RouterParams: RouterParams,
    NestedRoute: NestedRoute,
    FormSubmit: FormSubmit,
    FormSubmitAntd: FormSubmitAntd,
    ListSample: ListSample,
    DynamicForm: DynamicForm,
    MultipleRequest: MultipleRequest,
    WizardSample: WizardSample,
    Layout1: Layout1,
    Layout2: Layout2,
    LayoutResize: LayoutResize,
    formtest: formtest,
    basicTest:basicTest,
    BrotherCom:BrotherCom,
    test: test,
    testDemo1:testDemo1,
    testDemo2:testDemo2,
    testHooc:testHooc,
    // useState1:useState1,
    testForm:testForm,
    countdown:countdown,
    hoccomponent:hoccomponent,
    familylayout:familylayout,
    hooksCheckbox:hooksCheckbox

};

class App extends Component {
    handleLinkClick = key => {
        window.history.pushState(null, '', `/#/${key}`);
        this.forceUpdate();
    };

    render() {
        const currentPage = document.location.hash.replace(/#\/?/, '');
        let CurrentPage = routeMap[currentPage] || ChatApp;
        return (
            <div style={styles}>
                <ul className="menu-list">
                    {Object.keys(routeMap).map(key => (
                        <li key={key} className={key === currentPage ? 'is-active' : ''} style={{ listStyle: 'none' }}>
                            <span className="link" onClick={() => this.handleLinkClick(key)}>
                                {key}
                            </span>
                        </li>
                    ))}
                </ul>
                <div style={{ padding: '30px 0' }}>
                    <CurrentPage />
                </div>
            </div>
        );
    }
}

export default App;
