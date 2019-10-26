import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

export default class SpinButton extends Component {
   render() {
      const {onClick}=this.props;
      return (
         <div className="spin-button">
            <Button
               variant="contained"
               color="default" onClick={onClick}>
               SPIN
            </Button>
         </div>
      )
   }
}