import React ,{createContext,Component} from "react";

const BatteryContext = createContext();
const OnlineContext = createContext();

class Leaf extends Component {
    render() {
      return (
        <BatteryContext.Consumer>
          {
            battery => (
              <OnlineContext.Consumer>
                {
                  online => <h1>Battery: {battery}, Online: {String(online)}</h1>
                }
              </OnlineContext.Consumer>
            )
          }
        </BatteryContext.Consumer>
      );
    }
  }

//为了体现层级多的关系,增加一层Middle组件
class Middle extends Component {
    render(){
        return <Leaf/>
    }
}

class Apptest extends Component {
    state =  {
        battery:60,
        online:false
    }
    render(){
        const {battery,online} = this.state;
        return (
            <BatteryContext.Provider value={battery}>
                <OnlineContext.Provider value={online}>
                        <button type="button"
                            onClick={()=>{this.setState({battery:battery-1})}}
                        >
                            Press
                        </button>
                        <button type="button" style={{marginLeft:'10px'}}
                            onClick={()=>{this.setState({online:!online})}}
                        >
                            Switch
                        </button>
                        <Middle/>
                </OnlineContext.Provider>
            </BatteryContext.Provider>
        )
    }
}

export default Apptest;