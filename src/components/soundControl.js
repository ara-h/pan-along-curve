import { Component } from "react";


class SoundControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      fade: true,
      ctx: props.sound.ctx,
      env: props.sound.env
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

export default SoundControl;
