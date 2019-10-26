import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {SYMBOLS} from "../constants/index";

export default class Debug extends Component {
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
            <div className="col">
               <div>{`Reel #${reelIdx+1}`}</div>
               <TextField
                  select
                  className=""
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
                  className=""
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
               {getInputParameters(0)}
               {getInputParameters(1)}
               {getInputParameters(2)}
            </div>
            <div className="debug-actions">
               <Button
                  variant="contained"
                  color="default"
                  // startIcon={<CloudUploadIcon />}
                  onClick={this.doApply}
               >
                  Apply
               </Button>
            </div>
         </div>
      )
   }
}