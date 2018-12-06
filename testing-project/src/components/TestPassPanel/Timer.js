import React, { Component } from 'react';
import styled from 'styled-components'

const TimerDiv = styled.div`
	border: 1px solid  #4F9DA6;
	height: 44px;
    width: 100%;
    color: rgba(16, 5, 41, 1);
	text-align: center;
	line-height: 44px;
	box-sizing: border-box;
`;

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
            minutes: this.props.time,
            seconds: '00',
        }
    }

    tick = () => {
        let min = Math.floor(this.secondsRemaining / 60);
        let sec = this.secondsRemaining - (min * 60);

        this.setState({
          minutes: min,
          seconds: sec
        })

        if (sec < 10) {
          this.setState({
            seconds: "0" + this.state.seconds,
          })
        }

        if (min < 10) {
            this.setState({
            value: "0" + min,
            })
        }

        if ((min === 0 && sec === 0)) {
            clearInterval(this.intervalHandle);
            this.props.testEnded();
        }

        this.secondsRemaining--
    }
        
    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.secondsRemaining = time * 60;
    }

    componentDidMount() {
        this.startCountDown();
    }
    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    render() {
		return (
			<TimerDiv>
                {this.state.minutes}:{this.state.seconds}
            </TimerDiv>
		);
	}
}

export default Timer

