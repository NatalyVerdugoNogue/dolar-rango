import React from 'react';
import { DatePicker } from 'react-materialize';

const DateValue = ({ title,options, }) => (
  <DatePicker
            placeholder={title}
            options={options}
            onChange={(value) => {
              this.setState({ starDate });
              const newOptionsEnd = { ...optionsEnd, minDate: starDate };


              this.setState({ optionsEnd: newOptionsEnd })
              console.log('newOptionsEnd', this.state.optionsEnd);
              if (this.state.starDate && this.state.endDate) {
                this.getDollarRange()
              }
            }}
          />)



export default DateValue;