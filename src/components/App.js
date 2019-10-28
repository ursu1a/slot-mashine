import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slot from "./Slot";
import Debug from "./Debug";
import Balance from "./Balance";
import {SpinButton} from "./SpinButton";

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
      this.setState({
         isSpinning:true,
         spentCoins:0
      });
   };

   updateWinInfo = (winInfo, spinsCount=0) => {
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
         !isSpinning ? (isWinner ? 'Winner !' : 'Loser ((')
            : 'Please wait...'
      );
   }

   isDebugMode = () => {
     return this.state.mode === 'debug';
   };

   switchMode = () => {
      const {mode} = this.state;
      this.setState({
         mode: mode === 'debug' ? 'random' : 'debug',
         isWinner: undefined,
         backgroundShifts: []
      });
   };

   render() {
      const {isSpinning, winLines, mode, backgroundShifts, isWinner} = this.state;
      return (
         <Container maxWidth="sm" className="slot-machine">
            <div className="content">
               <div className="row label">
                  {isWinner !== undefined ?
                     <div className="title">{this.getWinnerLabel()}</div>
                     : <small>try your fortune !</small>
                  }
               </div>
               <div className="row slot">
                  <Slot isSpinning={isSpinning}
                        isDebugMode={mode === 'debug'}
                        backgroundShifts={backgroundShifts}
                        onStopSpin={this.updateWinInfo}
                  />
               </div>
               <div className="row debug">
                  <FormControlLabel
                     label="Debug"
                     control={
                        <Switch
                           checked={this.isDebugMode()}
                           disabled={isSpinning} value={mode}
                           color="secondary" onChange={this.switchMode}
                        />
                     }
                  />
               </div>
               <div className="row controls">
                  <Balance
                     updating={isSpinning} winLines={winLines} isWinner={isWinner}
                  />
                  <SpinButton
                     disabled={isSpinning || this.isDebugMode()}
                     onClick={this.onSpinButtonClick}
                  />
               </div>
               <div className="row">
                  {this.isDebugMode() &&
                     <Debug onApply={this.updateBackgroundShifts} />
                  }
               </div>
            </div>
         </Container>
      );
   }
}