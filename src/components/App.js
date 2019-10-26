import React, {Component} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slot from "./Slot";
import Debug from "./Debug";
import Controls from "./Controls";
import Balance from "./Balance";
import SpinButton from "./SpinButton";

export default class App extends Component {
   state = {
      isSpinning: false,
      winLines: {
         top: [],
         center: [],
         bottom: []
      },
      backgroundShifts: [],
      spentCoins: 0,
      isWinner: undefined,
      mode: 'random'
   };

   onSpinButtonClick = () => {
      this.setState({isSpinning:true, spentCoins:0});
   };

   updateWinInfo = (winInfo, spinsCount=0) => {
      console.log(winInfo);
      this.setState({
         winLines: winInfo,
         isSpinning: false,
         spentCoins: this.state.spentCoins + spinsCount,
         isWinner: this.checkIsWinner(winInfo.center)
      });
   };

   updateBackgroundShifts = shifts => {
      this.setState({backgroundShifts: shifts});
   };

   checkIsWinner(values) {
      return values.every(v => v === values[0]);
   };

   getWinnerLabel() {
      const {isSpinning, isWinner} = this.state;
      return (
         isWinner !== undefined ?
            !isSpinning ? (
               isWinner ? 'Winner' : 'Looser'
            ) : '...'
            : ''
      );
   }

   isDebugMode = () => {
     return this.state.mode === 'debug';
   };

   switchMode = () => {
      const {mode} = this.state;
      this.setState({
         mode: mode === 'debug' ? 'random' : 'debug'
      });
   };

   render() {
      const {isSpinning, winLines, mode, backgroundShifts}=this.state;
      return (
         <div className="app">
            <div className="row">{this.getWinnerLabel()}</div>
            <div className="row">
               <Slot isSpinning={isSpinning} isDebugMode={mode==='debug'} backgroundShifts={backgroundShifts} onStopSpin={this.updateWinInfo}/>
               {this.isDebugMode() &&
               <Debug onApply={this.updateBackgroundShifts}/>}
            </div>
            <div className="row">
               <Controls>
                  <Balance updating={isSpinning} winLines={winLines}/>
                  {!this.isDebugMode() && <SpinButton onClick={this.onSpinButtonClick}/>}
                  <FormControlLabel
                     control={
                        <Switch checked={this.isDebugMode()} value={mode} onChange={this.switchMode}/>
                     }
                     label="Debug"
                  />
               </Controls>
            </div>
         </div>
      );
   }
}