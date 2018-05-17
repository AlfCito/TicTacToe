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

  let btns = document.getElementsByClassName('btns');
  let btnX = document.getElementById('btnX');
  let btnO = document.getElementById('btnO');
  let playerText = document.getElementById('player');
  
  for(var x=0; x < btns.length; x++){
    btns[x].addEventListener("click", function (e){
      userPlay(this.value);
    });
  }

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


  firstPlayer = () => {

    let playerIni = Math.floor(Math.random() * 2); 

    if(playerIni === 0){
      playerText.innerHTML = 'AI START';
      aiPlay();
    }else{
      playerText.innerHTML = 'YOU START';
      userTurn = true;
    }

  }

  checkWinner = (char) => {
    
    if(gameArr[0] === char && gameArr[1] === char && gameArr[2] === char){ // row 1
      winner(char);
      return true;
    }else if(gameArr[3] === char && gameArr[4] === char && gameArr[5] === char){ // row 2
      winner(char);
      return true;
    }else if(gameArr[6] === char && gameArr[7] === char && gameArr[8] === char){ // row 3
      winner(char);
      return true;
    }else if(gameArr[0] === char && gameArr[3] === char && gameArr[6] === char){ // col 1
      winner(char);
      return true;
    }else if(gameArr[1] === char && gameArr[4] === char && gameArr[7] === char){ // col 2
      winner(char);
      return true;
    }else if(gameArr[2] === char && gameArr[5] === char && gameArr[8] === char){ // col 3
      winner(char);
      return true;
    }else if(gameArr[0] === char && gameArr[4] === char && gameArr[8] === char){ // diagonal 1
      winner(char);
      return true;
    }else if(gameArr[2] === char && gameArr[4] === char && gameArr[6] === char){ // diagonal 2
      winner(char);
      return true;
    }else{
      return false;
    }    

  }

  winner = (win) => {

    if(win === userChar){
      alert('User WIN');
    }else if (win === aiChar){
      alert('AI WIN');
    }
    
    userTurn = false;

  }

  aiPlay = () => {

    let charArr = refArr.join('');
    let aiMove = Number(charArr.charAt(Math.floor(Math.random() * charArr.length)));
    let toRemove = charArr.indexOf(aiMove);
    refArr.splice(toRemove, 1);

    let elid = 'c0' + aiMove;
    let id = document.getElementById(elid);
    gameArr[aiMove] = aiChar;
    id.innerHTML = aiChar;

    let check = checkWinner(aiChar);

    if( check === false ){
      userTurn = true; 
    }else{
      userTurn = false;
    } 

  }

  userPlay = (val) => {

    let id = document.getElementById(val);
    let index = val[val.length-1];

    if(id.innerHTML === ''){

      id.innerHTML = userChar;
      gameArr[index] = userChar;
      refArr.splice(index, 1);       

      let check = checkWinner(userChar);

      if( check === false ){
        aiPlay(); 
      }else{
        userTurn = false;
      }   

    }       

  }



}