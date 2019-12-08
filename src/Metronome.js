import React, { Component } from 'react';
import './Metronome.css';
import BPMSlider from './BPMSlider';
import { Button } from 'reactstrap';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 100,
      playing: false,
      count: 0,
      beatsPerMeasure: 4,
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.startStop = this.startStop.bind(this);
    this.playClick = this.playClick.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }

  startStop() {
    // stop metronome
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({ playing: false });
    }
    // start metronome with interval based on BPM set, reset count
    // start ticking as soon as state is set
    else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        playing: true,
      }, this.playClick)
    }
  }

  playClick() {
    const { count, beatsPerMeasure } = this.state;
    // on the first beat of every measure
    if (count % beatsPerMeasure === 0) this.click2.play();
    // every other beat
    else this.click1.play();
    this.setState(st => ({
      count: (st.count + 1) % st.beatsPerMeasure
    }));
  }

  handleBPMChange(evt) {
    const bpm = evt.target.value;
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        bpm
      })
    }
    else {
      this.setState({ bpm });
    }
  }

  render() {
    let { bpm, playing } = this.state;
    return (
      <div className="metronome">
        <BPMSlider bpm={bpm} handleBPMChange={this.handleBPMChange} />
        <Button color="primary" onClick={this.startStop}>{playing ? "Stop" : "Start"}</Button>
      </div>
    )
  }
}

export default Metronome;