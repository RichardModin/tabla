class BeatInterval {
  constructor(bpm) {
    this.bpm = bpm;
    this.intervalInMilliseconds = (60 / this.bpm) * 1000;
    this.intervalId = null;
    this.isPlaying = false;
    this.intervalIndex = 0;

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  setBpm(bpm) {
    this.bpm = bpm;
    this.intervalInMilliseconds = (60 / this.bpm) * 1000;
  }

  play(callback) {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.intervalId = setInterval(() => {
        callback(this.intervalIndex);
        this.intervalIndex += 1;
      }, this.intervalInMilliseconds);
    }
  }

  pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      clearInterval(this.intervalId);
    }
  }

  stop() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.intervalIndex = 0;
  }
}

export default BeatInterval;
