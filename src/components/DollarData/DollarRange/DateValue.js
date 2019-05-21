import React, { Component } from 'react';
import { DatePicker } from 'react-materialize';

class DateValue extends Component {
  constructor(props) {
    super(props);
    const title = props.title;
    const options = {...props.options, minDate: props.minDate};
    const minDate = props.minDate;
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      title,
      options,
      minDate,
      value: null
    }
  };

handleChange(event){
  this.props.onChange(event);
}

// shouldComponentUpdate(nextProps) {
//   const differentMinDate = this.props.options.minDate !== nextProps.options.minDate;

//   return true;
// }

  render() {
    const { title, options } = this.state;
    console.log('asdf:', title, options.minDate);
    return (
      <DatePicker
        placeholder={title}
        options={options}
        onChange={(value) => {
          this.setState({ value });
          this.handleChange(value);
        }}
      />
    )

  }

}



export default DateValue;