/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // using two loops, the first loop will create the base array and the second loop will populate it based on the width of the board
  for(let i = 0; i < height; i ++){
    board[i] = [];
    for(let j = 0; j < width; j ++){
      board[i][j] = null;
    }
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // create top 'dropzone' of the board
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // add event listener to handle clicks on top row
  top.addEventListener("click", handleClick);

  // set dropzone cells to have an id value eqaul to x
  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create cells and set attributes to correct id
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // initialize variable y
  let y = null;
  //use a loop to check the lowest position that y could be on the board
  // if no positions available, return null
  for(let i = height - 1; i >= 0; i --){
    if(board[i][x] === null){
      y = i;
      return y;
    }
  }
  return y;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  const piece = document.createElement("div");
  piece.classList.add("piece");
  if(currPlayer === 1){
    piece.classList.add("player1");
  }
  else{
    piece.classList.add("player2");
  }
  cell.appendChild(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);

  //use set timeout to give the players a second to see the win condtion before resetting the game
  setTimeout(() =>{
    location.reload();
  }, 2000)
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board 
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()){
    return endGame("It's a Tie!!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  console.log("player ",currPlayer);
  if(currPlayer === 1){
    currPlayer = 2;
  }
  else{    
    currPlayer = 1;   
  }   
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function win(cells) {

    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // use two loops to iterrate through the whole array and its nested array
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //creates possible win conditions that checks there is four pieces lined up on the board together
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //sends the win condition to the win function to further check and make sure the four pieces are all legal and belong to the same player
      if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
        return true;
      }
    }
  }
}

// adds functions that loops through each of the nested arrays to check if they are all filled
// if all arrays do not equal null, return false.

function checkForTie() { 
 return board.every((row) =>{
   return row.every((col) =>{
     return col !== null;
   })

 })
   
}

makeBoard();
makeHtmlBoard();
