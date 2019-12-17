import React from "react";
import {HashRouter as Router,Route,Link} from "react-router-dom";

// import { MemoryRouter } from "react-router";
import './routerstyle.css'
const Home = ()=>(<div><h1>Home</h1><p>Right Content</p></div>);
// const Home = function(){
//     return <h1>Home</h1>
// }
const Hello = ()=>(<div><h1>Hello</h1><p>Right Content</p></div>);
const About = ()=>(<div><h1>About Us</h1><p>Right Content</p></div>);


export default class RouterSample extends React.PureComponent{

    render(){

        return (
            <Router>
                <div>
                    <ul id="menu" className="menu">
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/hello">Hello</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>

                    <div id="page-container">

                        <Route exact path="/home" component={Home}></Route>
                        <Route path="/hello" component={Hello}></Route>
                        <Route path="/about" component={About}></Route>

                    </div>
                </div>
            </Router>
        )
    }



}

