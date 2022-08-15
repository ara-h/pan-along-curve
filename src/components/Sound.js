class Sound {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    this.ctx = audioCtx;

    this.listener = audioCtx.listener;

    this.setListenerPosition(0,0,0);
    this.setListenerOrientation(0,0,-1,0,1,0);

    const env = audioCtx.createGain();
    env.gain.setValueAtTime(0, audioCtx.currentTime);
    env.connect(audioCtx.destination);

    this.env = env;

    const pan = audioCtx.createPanner();
    pan.panningModel = 'HRTF';
    pan.connect(this.env);

    this.pan = pan;

    this.setPanOrientation(1,0,0);

    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.connect(this.pan);
    osc.start();

    this.osc = osc;
  }

  setListenerPosition(x, y, z) {
    if (this.listener.positionX) {
      this.listener.positionX.setValueAtTime(x, this.ctx.currentTime);
      this.listener.positionY.setValueAtTime(y, this.ctx.currentTime);
      this.listener.positionZ.setValueAtTime(z, this.ctx.currentTime);
    } else {
      this.listener.setPosition(x, y, z)
    }
  }

  setListenerOrientation(fx, fy, fz, ux, uy, uz) {
    if (this.listener.forwardX) {
      this.listener.forwardX.setValueAtTime(fx, this.ctx.currentTime);
      this.listener.forwardY.setValueAtTime(fy, this.ctx.currentTime);
      this.listener.forwardZ.setValueAtTime(fz, this.ctx.currentTime);
      this.listener.upX.setValueAtTime(ux, this.ctx.currentTime);
      this.listener.upY.setValueAtTime(uy, this.ctx.currentTime);
      this.listener.upZ.setValueAtTime(uz, this.ctx.currentTime);
    } else {
      this.listener.setOrientation(fx, fy, fz, ux, uy, uz)
    }
  }

  setPanPosition(x, y, z) {
    if (this.pan.positionX) {
      this.pan.positionX.setValueAtTime(x, this.ctx.currentTime);
      this.pan.positionY.setValueAtTime(y, this.ctx.currentTime);
      this.pan.positionZ.setValueAtTime(z, this.ctx.currentTime);
    } else {
      this.pan.setPosition(x, y, z);
    }
  }

  getPanPosition() {
    if (this.pan.positionX) {
      return [this.pan.positionX.value, this.pan.positionY.value, this.pan.positionZ.value]
    }
    else {
      return "old"
    }
  }

  setPanOrientation(x, y, z) {
    if (this.pan.orientationX) {
      this.pan.orientationX.setValueAtTime(x, this.ctx.currentTime);
      this.pan.orientationY.setValueAtTime(y, this.ctx.currentTime);
      this.pan.orientationZ.setValueAtTime(z, this.ctx.currentTime);
    } else {
      this.pan.setOrientation(x, y, z);
    }
  }
}

export default Sound;
