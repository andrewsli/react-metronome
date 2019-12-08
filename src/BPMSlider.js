import React, { Component } from 'react';

class BPMSlider extends Component {
  render() {
    return (
      <div className="bpm-slider">
        <div>{this.props.bpm} BPM</div>
        <input type="range" min="60" max="240" value={this.props.bpm} onChange={this.props.handleBPMChange}/>
      </div>
    )
  }
}

export default BPMSlider;