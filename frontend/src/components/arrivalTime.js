import React, { Component } from 'react';

class ArrivalTimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: '',
    };
  }

  generateTimeOptions() {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  }

  handleSelectChange = (event) => {
    const selectedTime = event.target.value;
    this.setState({ selectedTime });
  };

  render() {
    const timeOptions = this.generateTimeOptions();

    return (
      <div>
        <label>Select a Time: </label>
        <select
          value={this.state.selectedTime}
          onChange={this.handleSelectChange}
        >
          <option value="">-- Select --</option>
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ArrivalTimeInput
