import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./CalculateWinner";
import swal from "sweetalert";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Howl } from "howler";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "0";

  const audioClips = [
    {
      sound:
        "http://soundbible.com/mp3/Pacman_Introduction_Music-KP-826387403.mp3",
      label: "Cliclk for listen the audio",
    },
  ];

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const renderButtonSound = () => {
    return audioClips.map((soundObj, index) => {
      return (
        <button key={index} onClick={() => soundPlay(soundObj.sound)}>
          {soundObj.label}
        </button>
      );
    });
  };

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to the move # ${move}` : "Go to Start";
      return (
        <li key={move}>
          <button className="button p-3" onClick={() => jumpTo(move)}>
            {destination}
          </button>
        </li>
      );
    });

  return (
    <>
      <h1 className="game">Game</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>Sounds</h3>
          {renderButtonSound()}
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>
          {winner
            ? `winner:  ${winner} ${swal({
                title: "You Win ",
                text: "Congratulations !!!",
                icon: "success",
                button: "Accept",
                timer: "8000",
              })}`
            : "Next Player" + xO}
        </h3>
      </div>
    </>
  );
};

export default Game;
