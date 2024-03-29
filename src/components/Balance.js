import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import * as payouts from '../constants/payTable.json';

const payTable = payouts.default;

export default class Balance extends Component {
   static propTypes = {
      updating: PropTypes.bool,
      isWinner: PropTypes.bool,
      winLines: PropTypes.shape({
         top: PropTypes.arrayOf(PropTypes.number),
         center: PropTypes.arrayOf(PropTypes.number),
         bottom: PropTypes.arrayOf(PropTypes.number)
      })
   };

   state = {
      winLines: null,
      balance: 0
   };

   static getDerivedStateFromProps = (nextProps, prevState) => {
      if (JSON.stringify(nextProps.winLines) !== JSON.stringify(prevState.winLines)) {
         return {
            winLines: nextProps.winLines,
            balance: 0
         }
      }
      return null;
   };

   componentDidUpdate(prevProps, prevState) {
      if (JSON.stringify(prevState.winLines) !== JSON.stringify(this.state.winLines)) {
         this.calculateBalance();
      }
   }

   calculateBalance() {
      const {winLines} = this.state;
      const cherrySevenIds = [3,4];
      const cherrySevenWin = 75;
      const barsIds=[0,1,2];
      const barsWin = 5;
      let result = 0;

      const cherrySevenCheck = (arr, target) => target.every(v => arr.includes(v));

      const barsCombinationCheck = (arr, barsIds) => {
         let result=0;
         barsIds.forEach(v => {
            let include1 = arr.indexOf(v);
            let include2 = arr.lastIndexOf(v);
            if (include1>-1 && include2>-1 && include1!==include2) {
               result+=barsWin;
            }
         });
         return result;
      };

      for(let position in winLines) {
         if (cherrySevenCheck(winLines[position], cherrySevenIds)) {
            result+=cherrySevenWin;
         };

         result += barsCombinationCheck(winLines[position], barsIds);

         result += winLines[position].reduce((result, idx) => result + payTable[idx].payouts[position], 0);
      };


      this.setState({balance: result});
   }

   render() {
      const {balance} = this.state;
      const {updating, isWinner} = this.props;
      return (
         <div className="balance">
            <FormControl variant="outlined">
               <InputLabel htmlFor="component-outlined">
                  Balance
               </InputLabel>
               <OutlinedInput
                  id="component-outlined"
                  className={"balance-field " + (isWinner ? 'with-blink' : '')}
                  value={updating ? "--" : balance}
                  labelWidth={60}
               />
            </FormControl>
         </div>
      )
   }
}