import React, {Component} from 'react';
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
      spentCoins: 0,
      isWinner: undefined,
      mode: 'random'
   };

   onSpinButtonClick = () => {
      this.setState({isSpinning:true, spentCoins:0});
   };

   updateWinInfo = (winInfo, spinsCount) => {
      this.setState({
         winLines: winInfo,
         isSpinning: false,
         spentCoins: this.state.spentCoins + spinsCount,
         isWinner: this.checkIsWinner(winInfo.center)
      });
   };

   checkIsWinner(values) {
      return values.every(v => v === v[0]);
   };

   getWinnerLabel() {
      const {isSpinning, isWinner}=this.state;
      return (
         !isSpinning ? (
            isWinner ? 'Winner' : 'Looser'
         ) : '...'
      )
   }

   render() {
      const {isSpinning, winLines}=this.state;
      return (
         <div className="app">
            <div className="row">{this.getWinnerLabel()}</div>
            <div className="row">
               <Slot isSpinning={isSpinning} onStopSpin={this.updateWinInfo}/>
               <Debug/>
            </div>
            <div className="row">
               <Controls>
                  <Balance updating={isSpinning} winLines={winLines}/>
                  <SpinButton onClick={this.onSpinButtonClick}/>
               </Controls>
            </div>
         </div>
      );
   }
}