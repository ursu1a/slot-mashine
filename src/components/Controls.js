import React, {Component} from 'react';
import Balance from "./Balance";
import SpinButton from "./SpinButton";

export default class Controls extends Component {
   render() {
      return (
         <div className="controls">
            {this.props.children}
         </div>
      )
   }
}