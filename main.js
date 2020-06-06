const cellElements=document.querySelectorAll(`[data-cell]`);
const board=document.getElementById('board');
const xClass='x';
const circleClass='circle';
let turn;
const winningCombination=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

];

const winningMessageElement=document.getElementById('winningMessage');
const winningMessageElementText=document.querySelector('[data-winning-message-text]')
const restartButton=document.getElementById('restartButton');
restartButton.addEventListener('click',startGame)
function startGame(){
  turn=false;
  cellElements.forEach(x=>{
    x.classList.remove(xClass);
    x.classList.remove(circleClass);
    x.removeEventListener('click',handleClick);
    x.addEventListener('click',handleClick,{once:true})
  });
  setHover();
  winningMessageElement.classList.remove('show');

}
function checkWin(currentClass){
  return winningCombination.some(combination=>{
    return combination.every(index=>{
      return cellElements[index].classList.contains(currentClass);
    })
  })
}
startGame();
function handleClick(e){
  const cell=e.target;
  const currentClass=turn ? circleClass:xClass
  //PlaceMark
  placeMark(cell,currentClass);
  //CheckforWin
  if(checkWin(currentClass)){
    endGame(false);
    }
    else if(isDraw()){
      endGame(true);
      
    }
    else{
      swapTurns();
      setHover();
    }
}
function placeMark(cell,currentClass){
  cell.classList.add(currentClass);
}
function swapTurns(){
  turn=!turn;
}
function setHover(){
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  if(turn){
    board.classList.add(circleClass);

  }
  else{
    board.classList.add(xClass);
  }
}
function endGame(draw){
  if(draw){
    winningMessageElementText.innerText='Draw!'
  }
  else{
    winningMessageElementText.innerText=`${turn?"O's":"X's"}Wins!`;
  }
  winningMessageElement.classList.add('show');
}
function isDraw(){
  return [...cellElements].every(cell=>{
    return cell.classList.contains(xClass)
    ||cell.classList.contains(circleClass)
  })
}