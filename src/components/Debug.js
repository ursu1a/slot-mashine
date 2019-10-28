import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';
import {SYMBOLS} from "../constants/index";

export default class Debug extends Component {
   static propTypes = {
      onApply: PropTypes.func
   };

   state = {
      debug: []
   };

   handleChange = (reelIdx, isSymbol, isPosition) => event => {
      const value = event.target.value;
      let newData = this.state.debug;
      newData[reelIdx] = {
         ...newData[reelIdx],
         [isSymbol ? 'symbol' : 'position']: value
      };
      this.setState({
         debug: newData
      });
   };

   doApply = () => {
      const {debug} = this.state;
      let shifts = debug.map(({symbol, position}) => (symbol-position));
      this.props.onApply(shifts);
   };

   render() {
      const {debug} = this.state;

      const getInputParameters = reelIdx => {
         let
            symbolValue = (debug[reelIdx] || {}).symbol,
            positionValue = (debug[reelIdx] || {}).position;

         return (
            <div key={reelIdx} className="col">
               <div className="col-header">{`Reel #${reelIdx + 1}`}</div>
               <TextField
                  select
                  value={symbolValue !== undefined ? symbolValue : ""}
                  onChange={this.handleChange(reelIdx, true)}
                  InputProps={{
                     startAdornment: <InputAdornment position="start">Symbol</InputAdornment>,
                  }}
               >
                  {SYMBOLS.map((symbol, idx) => (
                     <MenuItem key={idx} value={idx}>
                        {symbol.name}
                     </MenuItem>
                  ))}
               </TextField>
               <TextField
                  select
                  value={positionValue !== undefined ? positionValue : ""}
                  onChange={this.handleChange(reelIdx, false)}
                  InputProps={{
                     startAdornment: <InputAdornment position="start">Position</InputAdornment>,
                  }}
               >
                  {Array.from(['top', 'center', 'bottom']).map((position, idx) => (
                     <MenuItem key={idx} value={idx}>
                        {position}
                     </MenuItem>
                  ))}
               </TextField>
            </div>
         );
      };

      return (
         <div className="debug-container">
            <div className="debug-fields">
               {Array.from([0, 1, 2]).map(
                  idx => getInputParameters(idx)
               )}
            </div>
            <div className="debug-actions">
               <Fab color="secondary" onClick={this.doApply} disabled={debug.length !== 3}>
                  <ReplayIcon/>
               </Fab>
            </div>
         </div>
      )
   }
}