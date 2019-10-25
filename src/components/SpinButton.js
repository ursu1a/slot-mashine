import React, {Component} from 'react';

export default class SpinButton extends Component {
   render() {
      const {onClick}=this.props;
      return (
         <div className="spin-button">
            <button onClick={onClick}>SPIN</button>
         </div>
      )
   }
}