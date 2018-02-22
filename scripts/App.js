'use strict';
//Game map max row and column
const MAX_ROWS= 10;
const MAX_COLS= 10;

//Ships Array
let shipsArray = [5,4,4,3,2];
let iPos, r, c, detect;
let score = 0;
let missiles = 60;
let shipDestroyed = 0;

//Game Map matrix for understand if ship is hit or not
let gameMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

class App {

  constructor() {
    this.fleet = new Array (shipsArray.length);
    this.checkingInsideMatrix();
    this.initScreen();
    this.setupHandlers();
  }


//Install Game Map
  initScreen() {

    //Play Game Loop Music
    var gameLoopSound = new buzz.sound("./sounds/MUS_GamePlayLoop1.wav",{loop:true});
    gameLoopSound.play();

    //Create Game Grid
    let gameAreaMarkup = '<table id="game-map">';
    for (let r=0; r<MAX_ROWS; r++) {
      gameAreaMarkup += "<tr>";
      for (let c=0; c<MAX_COLS; c++) {
        gameAreaMarkup += `<td class="cell" data-row="${r}" data-col="${c}"></td>`;
      }
      gameAreaMarkup += "</tr>";
    }
      gameAreaMarkup += "</table>";

      document.querySelector("#game-area").innerHTML = gameAreaMarkup;
  }

//When user clicks on map (Click Event)
setupHandlers() {
  document.querySelector('#game-map')
    .addEventListener('click', ( event ) => {

      let d = document;

      //Get the target of this event
      let theCellEll = event.target;

      //Debug of drag and drop (game map erased bug)
      if (!theCellEll.classList.contains("cell")) {
        return;
      }

      //Get the data-row and data-col from this cell
      let pos = {
        r: theCellEll.getAttribute('data-row'),
        c: theCellEll.getAttribute('data-col')
      }

      //Lookup the row and column in the map to see if there is a ship there
      //If there is a ship
      if(gameMap[pos.r][pos.c] != 0){
        theCellEll.innerHTML = '<div class="marker hit-ship"></div>';
        //Play explosion effect one by one when hit a ship
        var myExplosion1 = new buzz.sound("./sounds/effects/SFX_explosion1.wav"),
            myExplosion2 = new buzz.sound("./sounds/effects/SFX_explosion2.wav"),
            myExplosion3 = new buzz.sound("./sounds/effects/SFX_explosion3.wav"),
            myExplosion4 = new buzz.sound("./sounds/effects/SFX_explosion4.wav");

        var hitSound = [myExplosion1,myExplosion2,myExplosion3,myExplosion4];
        hitSound[Math.floor((Math.random() * hitSound.length) + 0)].play();
      }
      //If there is no ship
      else {
        theCellEll.innerHTML = '<div class="marker miss-ship"></div>';
        //Play water effect one by one when miss a ship
        var myWater1 = new buzz.sound("./sounds/effects/SFX_water_splash1.wav"),
            myWater2 = new buzz.sound("./sounds/effects/SFX_water_splash2.wav"),
            myWater3 = new buzz.sound("./sounds/effects/SFX_water_splash3.wav"),
            myWater4 = new buzz.sound("./sounds/effects/SFX_water_splash4.wav");

        var hitSound = [myWater1,myWater2,myWater3,myWater4];
        hitSound[Math.floor((Math.random() * hitSound.length) + 0)].play();
      }


      //Change ship images when it sunks
      if ((pos.r >= this.fleet[0].startR && pos.r <= this.fleet[0].endR) &&
          (pos.c >= this.fleet[0].startC && pos.c <= this.fleet[0].endC)) {
            this.fleet[0].hitNum += 1;
            if (this.fleet[0].hitNum == this.fleet[0].length) {
              d.querySelector("#ship1").classList.add("defeat");
              shipDestroyed ++;
            }
          }

      if ((pos.r >= this.fleet[1].startR && pos.r <= this.fleet[1].endR) &&
          (pos.c >= this.fleet[1].startC && pos.c <= this.fleet[1].endC)) {
            this.fleet[1].hitNum += 1;
            if (this.fleet[1].hitNum == this.fleet[1].length) {
              d.querySelector("#ship2").classList.add("defeat");
              shipDestroyed ++;
            }
          }

      if ((pos.r >= this.fleet[2].startR && pos.r <= this.fleet[2].endR) &&
          (pos.c >= this.fleet[2].startC && pos.c <= this.fleet[2].endC)) {
            this.fleet[2].hitNum += 1;
            if (this.fleet[2].hitNum == this.fleet[2].length) {
              d.querySelector("#ship3").classList.add("defeat");
              shipDestroyed ++;
            }
          }

      if ((pos.r >= this.fleet[3].startR && pos.r <= this.fleet[3].endR) &&
          (pos.c >= this.fleet[3].startC && pos.c <= this.fleet[3].endC)) {
            this.fleet[3].hitNum += 1;
            if (this.fleet[3].hitNum == this.fleet[3].length) {
              d.querySelector("#ship4").classList.add("defeat");
              shipDestroyed ++;
            }
          }

      if ((pos.r >= this.fleet[4].startR && pos.r <= this.fleet[4].endR) &&
          (pos.c >= this.fleet[4].startC && pos.c <= this.fleet[4].endC)) {
            this.fleet[4].hitNum += 1;
            if (this.fleet[4].hitNum == this.fleet[4].length) {
              d.querySelector("#ship5").classList.add("defeat");
              shipDestroyed ++;
            }
          }

      //Score
      score --;
      if (gameMap[pos.r][pos.c] != 0) {
        score += 5;
      }
      d.querySelector("#score").innerHTML = score;

      //Missiles
      missiles --;
      d.querySelector("#missiles").innerHTML = missiles;

      //Lost Alert
      if (missiles == 0) {
        alert("You Lost The Game");
        //Play win music
        var loseSound = new buzz.sound("./sounds/MUS_Lost1.wav",{loop:true});
        loseSound.play();
      }

      //Win Alert
      if (shipDestroyed == 5) {
        alert("You WIN !!!!!")
        //Play lost music
        var winSound = new buzz.sound("./sounds/MUS_Victory1.wav",{loop:true});
        winSound.play();
      }
  });
}

//collision detection
overLap(pos, row, col, i){
if(pos == 0){
  for (let h = col; h < col + shipsArray[i]; h++){
    if(gameMap[row][h] !==0)
      return false;
  }
}
else
{
  for (let v = row; v < row + shipsArray[i]; v++){
    if(gameMap[v][col] !==0)
      return false;
  }
}
return true;
}

//Put ships on game map horizontal or vertical. If there is ship, start loop again
//and put the ship onether place.
 checkingInsideMatrix()
 {
    for (let i=0; i< shipsArray.length; i++)
    {
      iPos = Math.floor((Math.random() * 2) + 0);

      //--------- horizontal =  0 -----------
      if (iPos == 0)
      {
        //r is row, c is column of start point
        r = Math.floor(Math.random() *  10);
        c = Math.floor(Math.random() * (10 - shipsArray[i] + 1));
        this.fleet[i] = new Ship(r,c,r,c + shipsArray[i] -1,shipsArray[i]);
        detect = this.overLap(iPos, r, c, i);
  		  if (!detect){
  		    i--;
  		    continue;
  		  }

        console.log("Ship Number : " + i);
        loop2:
        for (let a = c; a <c+shipsArray[i]; a++)
        {
          if (gameMap[r][a] != 0)
          {
            console.log("SOMEONE IS THERE");
            continue loop2;
          }
          gameMap[r][a] = shipsArray[i];

          console.log("row and col : " + r + " " + c);
        }

      }
      //-------- vertical  =  1 ----------------
      else
      {
        //r is row, c is column of start point
        r = Math.floor(Math.random() * (10 - shipsArray[i] + 1));
        c = Math.floor(Math.random() * 10);
        this.fleet[i] = new Ship(r,c,r + shipsArray[i] -1,c,shipsArray[i]);
        detect = this.overLap(iPos, r, c, i);
        if (!detect){
          i--;
          continue;
        }
        console.log("Ship Number : " + i);
        loop2:
        for (let b = r; b <r+shipsArray[i]; b++)
        {
          if (gameMap[b][c] != 0)
          {
            console.log("SOMEONE IS THERE");
            continue loop2;
          }
          gameMap[b][c] = shipsArray[i];
          console.log("row and col : " + r + " " + c);
        }
      }
    }
  }



}
let app = new App();
