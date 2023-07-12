import { useState } from 'react'; //importing state from react

function Square({ value, onSquareClick }) { //square component that holds value,prop=onSquareClick
                                            //tells board what to display when the square box is clicked
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) { //component name board that is passing props{xIsNext, squares, onPlay}
                                              //through other functions calling on board
  function handleClick(i) { //handleClick component passes through array index(square index) to determine thr winner.
    if (calculateWinner(squares) || squares[i]) {//If statement to calc.winner passing through squares or the squares index
      return; //to return if:
    }
    const nextSquares = squares.slice(); //variable mnextsquare hold value of squares calling slice method
                                        // create copy of square array
    if (xIsNext) { //calling on xIsNext thru the board
      nextSquares[i] = 'X'; // giving the nextSquare varible index value of X
    } else { // if xIsNOTNEXT nextSquare varible index is O
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);//varible winner with value of calc.winner passin through squares
  let status;
  if (winner) { // if statement for winner bein true then:
    status = 'Winner: ' + winner; // the status will show winner
  } else {// if winner not true then:
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // the status will show a conditional statement if
                                                      //the next player will be x or o
  }

  return ( // what will be displayed on browser| layout of game board
    <>
    
      <div className="status">{status}</div> 
      <div className="board-row"> 
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);//holds value of where xisnext. setXNextIs is the changeable state of xIsNext
  const [history, setHistory] = useState([Array(9).fill(null)]);//holds value of where history. setHistory is the changeable state of history.
                                                                //iterates through array starting with null to find the history 
  const currentSquares = history[history.length - 1];// iterates through history length minus 1 to find current square

  function handlePlay(nextSquares) { //handlePlay component handles how game is Played
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => { //iterating through history using mao method
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) { //caluc. the winner by:
  const lines = [// if the player lands on any one of these square patterens
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) { //looping through the lines length to determine who is the winner
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // if statement to return which squares are the winner
                                                                                // by giving  squares a.b,c values of lines index.
      return squares[a]; // return square a if, if statements are true
    }
  }
  return null; // else return undefined.
}
  



