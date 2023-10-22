import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4852ae"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: '0 auto' }}
        wrapperClassName="Loader"
      />
    );
  }
}
