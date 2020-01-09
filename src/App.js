import React from 'react';
import './App.css';



class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>STOPWATCH</h1>
        <Stopwatch />
      </div>
    )
  }
}


class Stopwatch extends React.Component {
  state = {
    status: false,
    runningTime: 0,
  };

  constructor(props) {
    super(props)
    this.timer = null
  }

  //läs mer på upg 03.3 date link

  startTimer = () => {
    const startTime = Date.now() - this.state.runningTime;
    this.timer = setInterval(() => {
      this.setState({ runningTime: Date.now() - startTime });
    });
  }

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        this.startTimer()
      }
      return { status: !state.status };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  };


  render() {

    const millis = this.state.runningTime % 1000
    const seconds = ("0" + Math.floor(this.state.runningTime / 1000) % 60).slice(-2)
    const min = ("0" + Math.floor(this.state.runningTime / 60000) % 60).slice(-2)
    const hours = ("0" + Math.floor(this.state.runningTime / (60 * 60 * 1000))).slice(-2)

    return (
      <div>
        <h1>{hours}:{min}:{seconds}<span id="millis">{millis}</span></h1>
        <button onClick={this.handleClick}> {this.state.status ? 'Stop' : 'Start'} </button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default App;


