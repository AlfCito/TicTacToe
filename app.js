window.onload = function() {

  $('#charModal').modal({
    keyboard: false,
    show: true,
    backdrop: false
  })

  let userChar = '';
  let aiChar = '';
  let gameArr = ['','','','','','','','',''];
  let refArr = ['0','1','2','3','4','5','6','7','8'];
  let userTurn = false;
  let playMode = false;

  let btns = document.getElementsByClassName('btns');
  let btnX = document.getElementById('btnX');
  let btnO = document.getElementById('btnO');
  let resetBtn = document.getElementById('reset');
  let playerText = document.getElementById('player');
  let result = document.getElementById('result');

  resetBtn.addEventListener("click", function (e){
    reset();
  });

  btnX.addEventListener("click", function (e){
    userChar = 'X';
    aiChar = 'O';
    firstPlayer();
  });

  btnO.addEventListener("click", function (e){
    userChar = 'O';
    aiChar = 'X';
    firstPlayer();
  });
  
  for(var x=0; x < btns.length; x++){
    btns[x].addEventListener("click", function (e){
      userPlay(this.value);
    });
  }

  firstPlayer = () => {

    playMode = true;

    let playerIni = Math.floor(Math.random() * 2); 

    if(playerIni === 0){
      playerText.innerHTML = 'COMPUTER START';
      aiPlay();
    }else{
      playerText.innerHTML = 'YOU START';
      userTurn = true;
    }

  }

  checkWinner = (char) => {

    if(gameArr[0] === char && gameArr[1] === char && gameArr[2] === char){ // row 1
      btns[0].classList.add("hor");
      btns[1].classList.add("hor");
      btns[2].classList.add("hor");
      winner(char);
      return true;
    }else if(gameArr[3] === char && gameArr[4] === char && gameArr[5] === char){ // row 2
      btns[3].classList.add("hor");
      btns[4].classList.add("hor");
      btns[5].classList.add("hor");
      winner(char);
      return true;
    }else if(gameArr[6] === char && gameArr[7] === char && gameArr[8] === char){ // row 3
      btns[6].classList.add("hor");
      btns[7].classList.add("hor");
      btns[8].classList.add("hor");
      winner(char);
      return true;
    }else if(gameArr[0] === char && gameArr[3] === char && gameArr[6] === char){ // col 1
      btns[0].classList.add("ver");
      btns[3].classList.add("ver");
      btns[6].classList.add("ver");
      winner(char);
      return true;
    }else if(gameArr[1] === char && gameArr[4] === char && gameArr[7] === char){ // col 2
      btns[1].classList.add("ver");
      btns[4].classList.add("ver");
      btns[7].classList.add("ver");
      winner(char);
      return true;
    }else if(gameArr[2] === char && gameArr[5] === char && gameArr[8] === char){ // col 3
      btns[2].classList.add("ver");
      btns[5].classList.add("ver");
      btns[8].classList.add("ver");
      winner(char);
      return true;
    }else if(gameArr[0] === char && gameArr[4] === char && gameArr[8] === char){ // diagonal 1
      btns[0].classList.add("eastWest");
      btns[4].classList.add("eastWest");
      btns[8].classList.add("eastWest");
      winner(char);
      return true;
    }else if(gameArr[2] === char && gameArr[4] === char && gameArr[6] === char){ // diagonal 2
      btns[2].classList.add("westEast");
      btns[4].classList.add("westEast");
      btns[6].classList.add("westEast");
      winner(char);
      return true;
    }else{
      return false;
    } 

  }

  winner = (win) => {

    if(win === userChar){
      result.innerHTML = 'YOU WON !';
    }else if (win === aiChar){
      result.innerHTML = 'YOU LOSE !';
    }
    
    playMode = false;
    userTurn = false;

  }

  aiPlay = () => {

    if(playMode){

      let charArr = refArr.join('');
      let aiMove = Number(charArr.charAt(Math.floor(Math.random() * charArr.length)));
      let toRemove = charArr.indexOf(aiMove);
      
      let elid = 'c0' + aiMove;
      let id = document.getElementById(elid);      

      if(id.innerHTML === ''){

        refArr.splice(toRemove, 1);
        gameArr[aiMove] = aiChar;
        id.innerHTML = aiChar;

      }else{
        alert('error it was a tie');
      }
      
      let check = checkWinner(aiChar);

      if( check === false ){
        if(refArr.length <= 0){
          result.innerHTML = 'WHAT A TIE !';
          playMode = false;
          userTurn = false;
        }else{
          userTurn = true; 
        }        
      }else{
        userTurn = false;
      } 

    }

  }

  userPlay = (val) => {

    if(playMode){

      playerText.innerHTML = '';

      let elid = 'c0' + val;
      let id = document.getElementById(elid);
      
      if(id.innerHTML === ''){

        let charArr = refArr.join('');
        let toRemove = charArr.indexOf(val);
        refArr.splice(toRemove, 1);

        gameArr[val] = userChar;
        id.innerHTML = userChar;

        let check = checkWinner(userChar);

        if( check === false ){
          if(refArr.length <= 0){
            result.innerHTML = 'WHAT A TIE !';
            playMode = false;
            userTurn = false;
          }else{
            aiPlay(); 
          }
        }else{
          userTurn = false;
        }   

      }  

    }

  }

  let reset = () => {
    gameArr = ['','','','','','','','',''];
    refArr = ['0','1','2','3','4','5','6','7','8'];
    userTurn = false;
    playMode = false;
    result.innerHTML = '';
    for(var x=0; x < btns.length; x++){
      btns[x].innerHTML = '';
      btns[x].classList.remove("hor");
      btns[x].classList.remove("ver");
      btns[x].classList.remove("eastWest");
      btns[x].classList.remove("westEast");

    }
    firstPlayer();
  }



}