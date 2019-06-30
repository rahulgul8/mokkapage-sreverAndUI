import React, { Component } from 'react';

const RadioButton = ({ onChange, value, checked, text }) => (
  <label>
    <input type="radio" name="radio-button-group" value={value} onChange={onChange} checked={checked} /> {text}
  </label>
);

const RadioGroup = ({ onChange, value, options }) => (
  <div>
    {options.map(option => (
      <RadioButton {...option} checked={option.value === value} onChange={onChange} />
    ))}
  </div>
);

class MyExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRadio: null,
    };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange(event) {
    this.setState({ selectedRadio: event.target.value });
  }

  handleFormChange(event) {
    console.log('Form change. Value: ', event.target.value);
  }

  render() {
    return (
      <form onChange={this.handleFormChange}>
        <label>
          Text
            <input type="text" name="textbox-field" />
        </label>
        <RadioGroup
          value={this.state.selectedRadio}
          onChange={this.onRadioChange}
          options={[
            { value: 'a', text: 'A' },
            { value: 'b', text: 'B' },
            { value: 'c', text: 'C' },
          ]}
        />
      </form>
    );
  }
}


export default MyExample;