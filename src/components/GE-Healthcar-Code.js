import React, { Component } from 'react';
import './GE-Layout.css'
// const { useState } = React;

const Family = (props) => {
    //   const [show, setShow] = useState(true);
    //   const toggle = () => setShow(!show);
    let {show=true,changeShow} =props;
    console.log('show',show);
    // const setShow = (show) =>!show;
    const toggle = () =>changeShow(!show);
    return (
        
        <div className="family">
            <div className="name" onClick={toggle}>
                {props.name}
            </div>
            {Array.isArray(props.children) && props.children.length > 0 && (
                <div className={`children ${show ? "show" : ""}`}>
                    {props.children.map((child) => (
                        <Family key={child.name} {...child} changeShow={changeShow}/>
                    ))}
                </div>
            )}
        </div>
    );
};

function FamilyTree(props) {
    const { family,show,changeShow } = props;
    console.log('familyTree',changeShow)
    return (
        <div className="table-container">
            {family.map((f) => (
                <Family key={f.name}  {...f} show={show} changeShow={changeShow}/>
            ))}
        </div>
    );
}

class FamilyLayout extends Component {

    //1.完成FamilyTree组件渲染出品字布局的家族谱

    //2.鼠标移动到每个节点时节点背景色变为浅蓝色

    //3.点击父节点实现子节点的隐藏和显示,隐藏和显示过程中有动画效果
    constructor(props) {
        super(props);
        this.state = {
            show:true
        }
    }
    // render() {
    //     return (
    //         <div>welcome GE Code</div>
    //     )
    // }

    changeShow =()=>{
        this.setState({
            show:!this.state.show
        })
    }

    dataSource = [
        {
            name: "爷爷",
            children: [
                {
                    name: "爸爸",
                    children: [
                        {
                            name: "我",
                            children: [{ name: "儿子" }, { name: "女儿" }]
                        },
                        { name: "妹妹" },
                        { name: "哥哥" }
                    ]
                },
                {
                    name: "叔叔",
                    children: [{ name: "堂兄" }, { name: "堂妹" }]
                }
            ]
        }
    ];

    render() {
        let {show} = this.state;
        return (
            <div className="container">
                <FamilyTree family={this.dataSource} show={show} changeShow={this.changeShow}/>
            </div>
        );
    }
}


export default FamilyLayout