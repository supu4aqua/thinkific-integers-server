import React, { Component } from 'react';

/* Component for custom input field. Replace redux defined input field with this componenr */
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.id }>{ this.props.label }</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
          placeholder={ this.props.placeholder }
          className="form-control"
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
        />
      </div>
    );
  }
}