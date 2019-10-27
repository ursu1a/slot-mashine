import React, {Component} from 'react';

export default class Reel extends Component {
   symbolHeight=141;

   componentDidMount() {
      if (window.matchMedia("(max-width: 768px)").matches) {
         this.symbolHeight=94;
      }
   }

   render() {
      const {backgroundShift} = this.props;
      return (
         <div className="reel-container">
            <div className="reel" style={{backgroundPosition: `0px ${(backgroundShift * this.symbolHeight) * (-1)}px`}} />
         </div>
      )
   }
}