import { Component } from "react";

class PlaySine extends Component {
  constructor(props) {
    super(props);

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    const envelope = audioCtx.createGain();
    envelope.gain.setValueAtTime(0, audioCtx.currentTime);
    envelope.connect(audioCtx.destination);

    const oscillator = audioCtx.createOscillator();
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(envelope)
    oscillator.start();


    this.state = {
      play: false,
      fade: true,
      ctx: audioCtx,
      env: envelope,
      osc: oscillator
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.fade) {
      this.fadeIn();
    } else {
      this.fadeOut();
    }

    this.setState(prevState => ({
      play: !prevState.play,
      fade: !prevState.fade
    }));
  }

  fadeIn() {
    //this.state.env.gain.cancelScheduledValues(this.state.ctx.currentTime);
    this.state.env.gain.linearRampToValueAtTime(0.01, this.state.ctx.currentTime + 0.015);
    this.state.env.gain.exponentialRampToValueAtTime(0.6, this.state.ctx.currentTime + 2.0);
  }

  fadeOut() {
    this.state.env.gain.setValueAtTime(this.state.env.gain.value, this.state.ctx.currentTime);
    this.state.env.gain.exponentialRampToValueAtTime(0.01, this.state.ctx.currentTime + 2.0);
    this.state.env.gain.linearRampToValueAtTime(0, this.state.ctx.currentTime + 2.015);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.play ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default PlaySine;
