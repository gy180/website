const player = "o";
const computer = "x";
var isFull = false;
var gameOver=false;
var score = {
    "tie":0, 
    "player1":0,
    "comp":0
}
var board = [null,null,null,
    null,null,null,
    null,null,null]

const boardGrid = document.getElementById('game-board');
const announce = document.getElementById('announce');
const c0 = document.getElementById('c0')
const c1 = document.getElementById('c1')
const c2= document.getElementById('c2')
const c3 = document.getElementById('c3')
const c4 = document.getElementById('c4')
const c5 = document.getElementById('c5')
const c6 = document.getElementById('c6')
const c7 = document.getElementById('c7')
const c8 = document.getElementById('c8')
const cell = [c0,c1,c2,c3,c4,c5,c6,c7,c8];
const scoreC = document.getElementById('comp-score');
const scoreT = document.getElementById('tie-score');
const scoreP = document.getElementById('player-score');


//check if all spaces on the grid is filled
boardFull =(currBoard)=>{
    let check =true;
    currBoard.forEach(element=>{
        if(element == null){
            check = false;
        }
    })
    return check;
}

//check if elements form a line
const lineChecker = (cell1, cell2, cell3,currBoard) => {
    return (currBoard[cell1] === currBoard[cell2] && currBoard[cell2] === 
        currBoard[cell3] && currBoard[cell1] !== null);
}


//check if there exists a line and which player the line belongs to
const winCon = (currBoard) => {
    let cond = false;
    //checks horizontal lines
    for(let i =0; i<9;i+=3){
        cond=lineChecker(i,i+1,i+2,currBoard);
        if(cond==true){
            return currBoard[i];
        }
    }
    //checks verticale lines
    for(let i =0; i<3;i++){
        cond=lineChecker(i,i+3,i+6,currBoard);
        if(cond==true){
            return currBoard[i];
        }
    }
    //diagonal checker
    if(lineChecker(0,4,8,currBoard)){
        return currBoard[0];
    }
    else if(lineChecker(2,4,6,currBoard)){
        return currBoard[2];
    }

    return "";
};

  //check to see if someone won
const checkWin = (board1) => {
    let res = winCon(board1);
    if (res == player) {
        score["player1"]+=1
        scoreP.innerText=score["player1"];
        gameOver=true;
        showAnnouncement("Player wins!");
    } else if (res == computer) {
        score["comp"]+=1
        scoreC.innerText=score["comp"];
        gameOver=true;
        showAnnouncement("Computer Wins!");
    } else if (isFull) {
        score["tie"]+=1;
        scoreT.innerText=score["tie"];
        gameOver=true;
        showAnnouncement("It's a Tie!");
    }
};

//continues the game
const gameLoop = () => {
    isFull=boardFull(board);
    checkWin(board);
}

//player's turn to add a move to the board
const playerMove = e => {
    if(gameOver){
        return;
    }
    if (!isFull && board[e] == null) {
        board[e] = player; //add move onto matrix
        //style move onto the web
        cell[e].innerText=player;
        cell[e].style.fontSize='60px';
        cell[e].style.color='bisque'; 
    }
    gameLoop();
    computerMove();
}


//computer's turn to make a move
const computerMove = () => {
    if (gameOver) {
        return;
    }

    
    let counter = 0;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            counter++;
        }
    }
   
    
    // Check if the computer can win on this move and win
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = computer;
            if (winCon(board) == computer && counter%2==0) {
                cell[i].innerText = computer;
                cell[i].style.fontSize = '60px';
                cell[i].style.color = 'bisque';
                gameLoop();
                return;
            }
            board[i] = null; // Reset the move
        }
    }

    // Check if the player is about to win and block the player
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = player;
            if (winCon(board) == player && counter%2==0) {
                board[i] = computer; // Block the player's winning move
                cell[i].innerText = computer;
                cell[i].style.fontSize = '60px';
                cell[i].style.color = 'bisque';
                gameLoop();
                return;
            }
            board[i] = null; // Reset the move
        }
    }
    // If no winning or blocking moves, make a random move
    
    if (!isFull && counter % 2 === 0) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (board[selected] !== null);
        board[selected] = computer;
        cell[selected].innerText = computer;
        cell[selected].style.fontSize = '60px';
        cell[selected].style.color = 'bisque';
        gameLoop();
    }
};

//reset the buttons
const attachClickHandlers = () => {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener('click', () => {
        playerMove(i);
      });
    }
};

//reset the game board
const reset= () => {
    board = [null,null,null,
        null,null,null,
        null,null,null];
    gameOver=false;
    isFull = false;
    for(let i=0; i<cell.length;i++){
        cell[i].innerText="";
    }

    attachClickHandlers();
    announce.classList.remove('announce-enter');
    announce.innerHTML='';
  };
  

// SHOW announcement
function showAnnouncement(msg) {
    // change the message
    announce.innerHTML = msg;
  
    // notification enter
    announce.classList.add('announce-enter');

}