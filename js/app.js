/*-------------------------------- Constants --------------------------------*/
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls=document.querySelectorAll(".sqr");
const messageEl=document.querySelector("#message");
const resetBtnEl = document.querySelector('#rest');
console.log(squareEls)
console.log(messageEl)


/*-------------------------------- Functions --------------------------------*/
const init=()=>{
    console.log("initialized successful");
    board=['','','','','','','','',''];
    turn='X';
    winner=false;
    tie=false;
    render()
}

const render=()=>{
    updateBoard()
    updateMessage()
}



const updateBoard=()=>{
   squareEls.forEach((sq,index)=>{
    //board[index]=turn;
    // console.log( board[index]);
    sq.textContent=board[index]
   })
    
}


const updateMessage=()=>{
    if(winner===false && tie===false){
        messageEl.textContent=`its ${turn} turn`;
    }
    else if(winner===false && tie===true){
        messageEl.textContent=`this is tie game`;
    }
    else{
        messageEl.textContent=`${turn} wins`;
    }

}


init()

const handleClick =(event)=>{
    const squareIndex=event.target.id;
    if(board[squareIndex]!==''){
        return;
    }
    else if(winner===true){
        return;
    }
    console.log(event.target.id)
    placePiece(squareIndex);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}

const placePiece = (index)=>{
    board[index]=turn;
    console.log(board);
}

const checkForWinner=()=>{
     for(let c=0;c<winningCombos.length;c++){
        let currnt=winningCombos[c];
        if(board[currnt[0]]!=='' 
            && 
            board[currnt[0]]===board[currnt[1]]
             && 
             board[currnt[0]]===board[currnt[2]])
            winner=true;
        

     }
}

const checkForTie = ()=>{
    if(winner===true)
        return;
    let check=board.every(cell => cell !== '');
        if(check)
            tie=true;
    console.log(tie)
}

const switchPlayerTurn = ()=>{
    if(winner===true){
        return;
    }
    else{
        if(turn==='X'){
            turn='O'
        }
        else{
            turn='X'
        }

    }
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr)=>{
    sqr.addEventListener("click",handleClick);
    //console.log(sqr.id)
})

resetBtnEl.addEventListener("click",init);


