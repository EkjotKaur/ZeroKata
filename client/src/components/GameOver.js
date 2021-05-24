import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

import "./GameOver.css";

const GameOver = ({ winner, draw }) => {
    const history = useHistory();
  return (
    <React.Fragment>
      <div className="gameOuterContainer">
        <div>
          <h1 className="gameOverHeading">GAME OVER</h1>
        </div>
        <div className="result">
          {draw && <div>This game was a draw</div>}
          {winner && <div>{winner} won the game</div>}
        </div>
        <div className="buttons">
          <Button onClick={() => history.push("/")}  className="GameOverBtn goBack">Go Back</Button>
          <Button onClick={() => history.push("/join")} className="GameOverBtn playAgain">Play Again</Button>
        </div>
      </div>
      {/* {<div className="object8"></div>}
      {<div className="object3"></div>}
      {<div className="object13"></div>} */}
    </React.Fragment>
  );
};

export default GameOver;
