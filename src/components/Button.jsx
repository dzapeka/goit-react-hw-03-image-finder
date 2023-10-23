import { Component } from 'react';

export default class Button extends Component {
  render() {
    const { name, onClickHandler } = this.props;
    return (
      <button type="button" className="Button" onClick={onClickHandler}>
        {name}
      </button>
    );
  }
}
