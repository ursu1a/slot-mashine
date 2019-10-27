import React from 'react';
import Fab from '@material-ui/core/Fab';
import LoopIcon from '@material-ui/icons/Loop';

export const SpinButton = ({disabled, onClick}) => (
   <Fab
      variant="extended"
      color="primary"
      className="spin-button"
      disabled={disabled}
      onClick={onClick}
   >
      <LoopIcon className="spin-icon"/>
      Spin&nbsp;
   </Fab>
);