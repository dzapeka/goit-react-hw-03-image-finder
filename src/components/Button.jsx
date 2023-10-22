import { Component } from 'react';

export class Button extends Component {
  render() {
    const { name, onClickHandler } = this.props;
    return (
      <button type="button" className="Button" onClick={onClickHandler}>
        {name}
      </button>
    );
  }
}
