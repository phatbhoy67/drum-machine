import React, { Component } from 'react';
import './App.css';
import drumpadList from './DrumpadList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { displayText: '' };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // console.log(event.target.id)
    const sound = event.target.children[0];
    this.setState({ displayText: event.target.id });
    sound.currentTime = 0;
    sound.play();
  }

  handleKeyPress(event) {
    // console.log(event.which);
    const keyUpper = event.key.toUpperCase();
    const key = event.which;
    const audio = document.getElementsByTagName('audio');
    drumpadList.forEach((drumpad, i) => {
      if (drumpad.keycode === key || drumpad.buttonText === keyUpper) {
        this.setState({ displayText: drumpad.audioDescription });
        audio[i].currentTime = 0;
        audio[i].play();
      }
    });
  }
  render() {
    const drumpads = drumpadList.map(drumpad => (
      <button
        id={drumpad.audioDescription}
        className="drum-pad"
        key={drumpad.audioDescription}
        src={drumpad.audioTrack}
        onClick={this.handleClick}
      >
        {drumpad.buttonText.toUpperCase()}
        <audio
          id={drumpad.buttonText}
          src={drumpad.audioTrack}
          className="clip"
        />
      </button>
    ));
    return (
      <div
        id="drum-machine"
        className="drum-machine"
        onKeyPress={this.handleKeyPress}
      >
        <h1>HumDrum</h1>
        <h2 id="display">
          {!this.state.displayText ? 'DRUMMER' : this.state.displayText}
        </h2>
        <div>{drumpads}</div>
      </div>
    );
  }
}

export default App;
