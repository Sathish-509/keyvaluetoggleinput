import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends React.Component {

    render() {
      return (
        <div>
          <input
            type="number"
            name={this.props.name}
            className={this.props.className}
            placeholder={this.props.placeholder}
            min={this.props.minValue !== undefined ? this.props.minValue : ''}
            max={this.props.maxValue !== undefined ? this.props.maxValue : ''}
            value={this.props.defaultValue !== undefined ? this.props.defaultValue : ''}
            onChange={this.props.onChange}/>
        </div>
      );
    }

}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onChange: PropTypes.string.isRequired
};

export default NumberInput;
