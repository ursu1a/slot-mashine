import React, {Component} from 'react';
import Reel from "./Reel";
import {SYMBOLS} from "../constants/index";

export default class Slot extends Component {
   constructor(props) {
      super(props);
      this.state = {
         positions: [
            [0,1,2,3,4],
            [0,1,2,3,4],
            [0,1,2,3,4]
         ],
         currentPositions: [
            [0,1,2,3,4],
            [0,1,2,3,4],
            [0,1,2,3,4]
         ],
         spinsCount: 0
      };
   }

   componentDidUpdate(prevProps) {
      if (this.props.isSpinning && !prevProps.isSpinning) {
         this.doSpinReels(this.props.onStopSpin);
      }

      if (this.props.isDebugMode && JSON.stringify(this.props.backgroundShifts) !== JSON.stringify(prevProps.backgroundShifts)) {
         let currentPositions = this.getPositionsByShifts();
         let winInfo = this.getWinInfo(currentPositions);
         this.props.onStopSpin(winInfo);
      }
   }

   spinReel = (index) => {
      const {currentPositions}=this.state;
      const randomSReelShift = Math.floor(Math.random() * SYMBOLS.length)+1;
      const reelPositions = currentPositions[index];
      let newReelPositions = reelPositions.slice(randomSReelShift);
      newReelPositions = newReelPositions.concat(reelPositions.slice(0, randomSReelShift));
      this.onSpinReel(index, newReelPositions);
   };


   onSpinReel = (index, positions) => {
      let nextPositions = this.state.currentPositions;
      nextPositions[index] = positions;
      this.setState({
         currentPositions: nextPositions,
         spinsCount: this.state.spinsCount + 1
      });
   };

   doSpinReels = (callback) => {
      this.setState({spinsCount: 0}, () => {
         this.timer = setInterval(() => {
            this.spinReel(0);
            this.spinReel(1);
            this.spinReel(2);
         }, 300);
         setTimeout(() => {
            clearInterval(this.timer);
            this.updatePositionsCascade();
            callback(this.getWinInfo(this.state.currentPositions), this.state.spinsCount);
         }, 2000);
      });
   };

   getWinInfo(positions) {
      return ({
         top: positions.map(item => item[0]),
         center: positions.map(item => item[1]),
         bottom: positions.map(item => item[2])
      });
   }

   getPositionsByShifts() {
      const {backgroundShifts}=this.props;
      const reelPositions = [0,1,2,3,4];
      let positions = [];

      for(let i=0; i<backgroundShifts.length; i++) {
         let reelShift = backgroundShifts[i];
         let newReelPositions = reelPositions.slice(reelShift);
         newReelPositions = newReelPositions.concat(reelPositions.slice(0, reelShift));
         positions[i] = newReelPositions;
      }
      return positions;
   }

   updatePositionsCascade() {
      const {currentPositions, positions} = this.state;
      let newPositions = positions, slotNumber = 0;

      const updateOneSlot = slotNumber => {
         return new Promise(resolve => {
            newPositions[slotNumber] = currentPositions[slotNumber];
            this.setState({
               positions: newPositions
            }, () => {
               setTimeout(() => resolve(slotNumber), 500)
            });
         });
      };

      updateOneSlot(slotNumber)
         .then((slotNumber) => updateOneSlot(slotNumber + 1)
            .then((slotNumber) => updateOneSlot(slotNumber + 1)
         ));
   }

   render() {
      const {currentPositions, positions} = this.state;
      const {isSpinning, isDebugMode, backgroundShifts}=this.props;
      let shownPositions = isSpinning ? currentPositions : positions;
      return (
         <div className="slot-container">
            {Array.from([0,1,2]).map((idx) => (
               <Reel key={idx} idx={idx}
                     backgroundShift={!isDebugMode ? shownPositions[idx][0] : backgroundShifts[idx]}/>
            ))}
         </div>
      )
   }
}