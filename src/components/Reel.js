import React, {Component} from 'react';

export default class Reel extends Component {
   render() {
      const {backgroundShift} = this.props;
      return (
         <div className="reel" style={{backgroundPosition: `0px ${(backgroundShift * 141) * (-1)}px`}} />
      )
   }
}