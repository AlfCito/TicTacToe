window.onload = function() {

  var userChar = '';
  var aiChar = '';

  var gameArr = ['','','','','','','','',''];
  var origBoard = [0,1,2,3,4,5,6,7,8];

  var userTurn = false;
  var playMode = false;
  var difficult = false;

  var fc = 0;

  var btns = document.getElementsByClassName('btns');
  var btnX = document.getElementById('btnX');
  var btnO = document.getElementById('btnO');
  var resetBtn = document.getElementById('reset');
  var settingsBtn = document.getElementById('settings');
  var charModal = document.getElementById('charModal');
  var playerText = document.getElementById('player');
  var infoText = document.getElementById('info');

  var babyLevel = document.getElementById('babyLevel');
  var godLevel = document.getElementById('godLevel');


  //load modal to select team
  $('#charModal').modal({
    keyboard: false,
    show: true,
    backdrop: false
  })

  btnX.addEventListener("click", function (e){
    userChar = 'X';
    aiChar = 'O';
    reset();
  });

  btnO.addEventListener("click", function (e){
    userChar = 'O';
    aiChar = 'X';
    reset();
  });

  resetBtn.addEventListener("click", function (e){
    reset();
  });

  settingsBtn.addEventListener("click", function (e){

    if(!playMode){
      $('#charModal').modal({
        keyboard: false,
        show: true,
        backdrop: false
      })
    }
    
  });

  for(var x=0; x < btns.length; x++){
    btns[x].addEventListener("click", function (e){
      userPlay(this.value);
    });
  }

  activateBtns = () => {
    $('#settings').removeAttr("disabled",'');
    $('#reset').removeAttr("disabled",'');
  }


  firstPlayer = () => {

    var level;

    if(babyLevel.checked == true){
      difficult = false;
      level = 'Baby Mode';
    }else if(godLevel.checked == true){
      difficult = true;
      level = 'God Mode';
    }

    $('#settings').attr("disabled",'');
    $('#reset').attr("disabled",'');

    infoText.innerHTML = "Level: " + level + "   |   Human Team: " + userChar;

    playMode = true;

    var playerIni = Math.floor(Math.random() * 2); 

    if(playerIni === 0){
      playerText.innerHTML = 'COMPUTER START';
      aiPlay();
    }else{
      playerText.innerHTML = 'YOU START';
      userTurn = true;
    }

  }
   

  checkWinner = (board, char) => {

    if(board[0] == char && board[1] == char && board[2] == char){ // row 1
      btns[0].classList.add("hor");
      btns[1].classList.add("hor");
      btns[2].classList.add("hor");
      winner(char);
      return true;
    }else if(board[3] == char && board[4] == char && board[5] == char){ // row 2
      btns[3].classList.add("hor");
      btns[4].classList.add("hor");
      btns[5].classList.add("hor");
      winner(char);
      return true;
    }else if(board[6] == char && board[7] == char && board[8] == char){ // row 3
      btns[6].classList.add("hor");
      btns[7].classList.add("hor");
      btns[8].classList.add("hor");
      winner(char);
      return true;
    }else if(board[0] == char && board[3] == char && board[6] == char){ // col 1
      btns[0].classList.add("ver");
      btns[3].classList.add("ver");
      btns[6].classList.add("ver");
      winner(char);
      return true;
    }else if(board[1] == char && board[4] == char && board[7] == char){ // col 2
      btns[1].classList.add("ver");
      btns[4].classList.add("ver");
      btns[7].classList.add("ver");
      winner(char);
      return true;
    }else if(board[2] == char && board[5] == char && board[8] == char){ // col 3
      btns[2].classList.add("ver");
      btns[5].classList.add("ver");
      btns[8].classList.add("ver");
      winner(char);
      return true;
    }else if(board[0] == char && board[4] == char && board[8] == char){ // diagonal 1
      btns[0].classList.add("eastWest");
      btns[4].classList.add("eastWest");
      btns[8].classList.add("eastWest");
      winner(char);
      return true;
    }else if(board[2] == char && board[4] == char && board[6] == char){ // diagonal 2
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
      playerText.innerHTML = 'YOU WON !';
    }else if (win === aiChar){
      playerText.innerHTML = 'YOU LOSE !';
    }
    
    playMode = false;
    userTurn = false;
    activateBtns();

  }

  aiPlay = () => {

    if(playMode){

      if(difficult == false){

        var charArr = origBoard.join('');
        var aiMove = Number(charArr.charAt(Math.floor(Math.random() * charArr.length)));
        var toRemove = charArr.indexOf(aiMove);
        
        var elid = 'c0' + aiMove;
        var id = document.getElementById(elid);      

        if(id.innerHTML === ''){

          origBoard.splice(toRemove, 1);
          gameArr[aiMove] = aiChar;
          id.innerHTML = aiChar;

        }else{
          alert('error it was a tie');
        }

        var check = checkWinner(gameArr, aiChar);

      }else{


        var bestSpot = minimax(origBoard, aiChar);
        origBoard[bestSpot.index] = aiChar;

        console.log("bestSpot.index");
        console.log(bestSpot.index);

        var elid = 'c0' + bestSpot.index;        
        var id = document.getElementById(elid);

        if(id){
          id.innerHTML = aiChar;
        }
        
        console.log("function calls: " + fc);
        console.log(origBoard);

        var check = checkWinner(origBoard, aiChar);
         
      }
 

      if( check === false ){
        if(difficult == false){
          if(origBoard.length <= 0){
            playerText.innerHTML = 'WHAT A TIE !';
            playMode = false;
            userTurn = false;
            activateBtns();
          }else{
            userTurn = true; 
          }
        }else{
          var counter = emptyIndexies(origBoard);
          if(counter.length == 0 ){
            playerText.innerHTML = 'WHAT A TIE !';
            playMode = false;
            userTurn = false;
            activateBtns();
          }else{
            userTurn = true;
          }
        }
      }else{
        userTurn = false;
      }

    }

  }

  userPlay = (val) => {

    if(playMode){

      playerText.innerHTML = '';

      var elid = 'c0' + val;
      var id = document.getElementById(elid);
      
      if(id.innerHTML === ''){

        if(!difficult){

          var charArr = origBoard.join('');
          var toRemove = charArr.indexOf(val);
          gameArr[val] = userChar;
          origBoard.splice(toRemove, 1);
          var check = checkWinner(gameArr, userChar);

        }else{

          origBoard[val] = userChar;
          var check = checkWinner(origBoard, userChar);

        }

        id.innerHTML = userChar;        

        if( check === false ){
          if(difficult == false){
            if(origBoard.length <= 0){
              playerText.innerHTML = 'WHAT A TIE !';
              playMode = false;
              userTurn = false;
              activateBtns();
            }else{
              aiPlay(); 
            }
          }else{
            var counter = emptyIndexies(origBoard);
            if(counter.length == 0 ){
              playerText.innerHTML = 'WHAT A TIE !';
              playMode = false;
              userTurn = false;
              activateBtns();
            }else{
              aiPlay();
            }
          }
        }else{
          userTurn = false;
        }   

      }  

    }

  }

  var reset = () => {
    gameArr = ['','','','','','','','',''];
    origBoard = [0,1,2,3,4,5,6,7,8];
    userTurn = false;
    playMode = false;
    playerText.innerHTML = '';
    for(var x=0; x < btns.length; x++){
      btns[x].innerHTML = '';
      btns[x].classList.remove("hor");
      btns[x].classList.remove("ver");
      btns[x].classList.remove("eastWest");
      btns[x].classList.remove("westEast");

    }
    firstPlayer();
  }


  function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }


  function minimax(newBoard, player){


    fc++;

    var availSpots = emptyIndexies(newBoard);

    if ( winning(newBoard, userChar) ){

      return {score:-10};

    }else if( winning(newBoard, aiChar) ){

      return {score:10};

    }else if ( availSpots.length === 0 ){
      return {score:0};

    }

    var moves = [];

    for ( var i = 0; i < availSpots.length; i++ ){

      var move = {};
      move.index = newBoard[availSpots[i]];

      newBoard[availSpots[i]] = player;

      if (player == aiChar){
        var result = minimax(newBoard, userChar);
        move.score = result.score;
      }else{
        var result = minimax(newBoard, aiChar);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      moves.push(move);

    }

    var bestMove;
    if(player === aiChar){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove];

  }


  function winning(board, player){
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
      ){
      return true;
    } else {
       return false;
    }
  }





}