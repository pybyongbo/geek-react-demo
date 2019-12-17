import React from "react";
import { Button,message ,Tag} from "antd";

class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
            over: false,
            isCuttingdown:false,
            time: {
                hours: 1,
                minutes: 0,
                seconds: 0
            }
        };
    }

    startCutdown = () =>{
        clearInterval(this.timerID);
        this.timerID = setInterval(() => this.tick(), 1000);
        this.setState({
            isCuttingdown:true
        })
    }

    componentDidMount() {
        console.log("Clock will mount");
        const {hours,minutes,seconds} = this.props;
        this.setState({
            time: {
                hours: hours ||0,
                minutes: minutes ||0,
                seconds: seconds ||0
            }
        })
        // this.timerID = setInterval(() => this.tick(), 1000);
    }

    setPaused = () =>{

        this.setState({
            paused:!this.state.paused
        },()=>{
            this.timerID = this.state.paused?clearInterval(this.timerID):setInterval(() => this.tick(),1000);
        })

    }


    tick = () => {
        const { time,paused, over,  isCuttingdown } = this.state;
        if(paused || over) return;
        if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
            this.setState({
                over:true,
                isCuttingdown:false
            })
            clearInterval(this.timerID);
            message.success('倒计时结束');
        } else if (time.minutes == 0 && time.seconds == 0)
            this.setState({
                time: {
                    hours: time.hours - 1,
                    minutes: 59,
                    seconds: 59
                }
            });
        else if (time.seconds == 0)
            this.setState({
                time: {
                    hours: time.hours,
                    minutes: time.minutes - 1,
                    seconds: 59
                }
            })
        else
            this.setState({
                time: {
                    hours: time.hours,
                    minutes: time.minutes,
                    seconds: time.seconds - 1
                }
            })
    }

    reset = () => { //重置倒计时
        const {hours,minutes,seconds} = this.props;
        this.setState({
            paused:false,
            over:false,
            time: {
                hours: hours ||0,
                minutes: minutes ||0,
                seconds: seconds ||0
            }
        })
        clearInterval(this.timerID);
        this.timerID = setInterval(() => this.tick(), 1000);
    };
    render() {
        const { over,paused,isCuttingdown } = this.state;
        console.log(paused);
        const {time} = this.state;
       
        return (
            <div>
                <h1>倒计时组件测试:</h1>
                <br/>
                <h2>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
                    .toString()
                    .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</h2>
                <div style={{height:'30px',lineHeight:'30px',marginBottom:'20px'}}>

                {over ?<Tag color="#2db7f5">Time's up!倒计时结束啦~</Tag>: ''}
    
                </div>
                {!over&&<Button type="primary" onClick={() => this.setPaused(!paused)} style={{marginRight:'30px'}}>{paused ? 'Resume(继续)' : 'Pause(暂停)'}</Button>}
                <Button type="danger" onClick={() => this.reset()} style={{marginRight:'30px'}}>Restart</Button>
                <Button onClick={()=>this.startCutdown()} disabled={isCuttingdown}>发送验证码</Button>
            </div>
        );
    }

}

export default class CountDownTime extends React.Component {

    render() {
        return (
            <CountDown minutes="0" seconds="5" />
        )
    }

}