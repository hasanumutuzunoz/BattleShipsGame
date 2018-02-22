/*
BattleShips Game
@Copyright Hasan Umut Uzunoz
@Author: Hasan Umut Uzunoz
*/

'use strict';
//New ship object
class Ship {
//startR is ships start point row
//startC is ships start point column
//endR is ships end point row
//endC is ships end point column
//length is ship length
  constructor(startR, startC, endR, endC, length) {
    this.startR = startR;
    this.startC = startC;
    this.endR = endR;
    this.endC = endC;
    this._length = length;
    this.hitNum = 0;
  }

  set startR(value) {
    this._startR = value;
  }

  get startR() {
    return this._startR;
  }

  set startC(value) {
    this._startC = value;
  }

  get startC() {
    return this._startC;
  }

  set endR(value){
    this._endR = value;
  }

  get endR(){
    return this._endR;
  }

  set endC(value){
    this._endC = value;
  }

  get endC(){
    return this._endC;
  }

  set length(value) {
    this._length = value;
  }

  get length() {
    return this._length;
  }

  set hitNum(value) {
    this._hitNum = value;
  }

  get hitNum() {
    return this._hitNum;
  }

}
