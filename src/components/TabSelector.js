import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TabSelector.css';

export default class AdvancedTabSelector extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        options: PropTypes.array,
        onChange: PropTypes.func,
        children: PropTypes.func
      };
    
      static defaultProps = {
        value: null,
        options: [],
        onChange: () => {},
        children: () => {}
      };
    
      render() {
        const { options } = this.props;
        return (
          <div className="tab-selector">
            <ul>
              {options.map(opt => (
                <li
                  key={opt.value}
                  className={`tab-item ${opt.value === this.props.value ? "selected" : ""}`}
                  onClick={() => this.props.onChange(opt)}
                >
                  {opt.name}
                </li>
              ))}
            </ul>
            <br />
            <br />
            {this.props.value && this.props.children(this.props.value)}
          </div>
        );
      }
}




const colors = [
    { name: "red", value: "red" },
    { name: "blue", value: "blue" },
    { name: "orange", value: "orange" }
  ];
  
  const animals = [
    { name: "Tiger", value: "tiger" },
    { name: "Elephant", value: "elephant" },
    { name: "Cow", value: "cow" }
  ];

  const sizes = [
    { name: "小号字体", value: "12px",color:'red' },
    { name: "中号字体", value: "24px" ,color:'blue'},
    { name: "大号字体", value: "36px",color:'orange' },
    { name: "特大号字体", value: "42px",color:'maroon' }
  ];


  export class TabSelectorSample extends PureComponent {
    state = {
      color: null,
      size:null,
      bgcolor:null
    };
    render() {
      return (
        <div>
          <h3>Select color: </h3>
          <AdvancedTabSelector
            options={colors}
            value={this.state.color}
            onChange={c => this.setState({ color: c.value },()=>{
              console.log(this.state)
            })}
          >
            {color => (
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: color,
                  width: "100px",
                  height: "100px"
                }}
              />
            )}
          </AdvancedTabSelector>
          <br />
          <br />
          <br />
          <h3>Select animal: </h3>
          <AdvancedTabSelector
            options={animals}
            value={this.state.animal}
            onChange={c => this.setState({ animal: c.value })}
          >
            {animal => (
              <img width="100px" src={require(`../images/${animal}.png`)} alt="111"/>
            )}
          </AdvancedTabSelector>
            <br/>
            <br/>
            <h3>Select fontSize: </h3>
          <AdvancedTabSelector
            options={sizes}
            value={this.state.size}
            onChange={
              c=>this.setState({size:c.value,bgcolor:c.color},()=>{
                console.log(c)
              })
            }
          >
            {size => (
              <span
                style={{
                  fontSize: size,
                  color:this.state.bgcolor
                }}
              >改变字体大小和字体颜色</span>
            )}
          </AdvancedTabSelector>

        </div>
      );
    }
  }
  
