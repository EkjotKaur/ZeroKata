import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Game.css";
import ErrorModal from "./ErrorModal";
import { Link, useHistory } from "react-router-dom";
// import { Button } from "@material-ui/core";
import { UserContext } from "../App";
import { Button, Col, Row } from "react-bootstrap";
import GameOver from "./GameOver";

let socket;

const Chat = ({ location }) => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const [name, setName] = useState("");
  const [otherPlayer, setOtherPlayer] = useState("");
  const [room, setRoom] = useState("");
  const [symbol, setSymbol] = useState("");
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  // const ENDPOINT = "https://react-app-chit-chat.herokuapp.com/";
  // const ENDPOINT = "http://localhost:5000/";
  const ENDPOINT = "http://localhost:5000/";

  // const [info, setInfo] = useState(false);
  const [error, setError] = useState();
  const [socketOn, setSocketOn] = useState(true);
  const [leave, setLeave] = useState(false);

  const B = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  const [boardGame, setBoardGame] = useState(B);
  const [turn, setTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState("");

  // console.log(state);

  useEffect(() => {
    if (leave) {
      history.push("/");
    }
  }, [leave]);

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);
    const { user, room } = state;
    // socket = io(ENDPOINT);
    socket = io();
    // console.log(socket);

    // console.log(socket.status);
    // console.log(socket.connection);
    // console.log(socket.disconnected);
    // console.log(socket.connected);
    // console.log(socket.id);
    // console.log(socket);

    setRoom(room);
    setName(user);
    // setOtherPlayer(otherUser)
    // console.log(room, name);
    // console.log(user);
    // console.log(room);
    const Name = user;

    socket.emit("join", { Name, room }, (props) => {
      // console.log(props);
      if (props.error) {
        setMessage(props.error);
        history.push("/join");
      }
      setSymbol(props.symbol);
      setOtherPlayer(props.otherUser);

      if (props.symbol == 1) setTurn(true);
      else setTurn(false);

      if (socket.id) setSocketOn(true);
      else setSocketOn(false);

      // socket.on(
      //   "symbol",
      //   ({ Symbol }) => {
      //     console.log(Symbol);
      //     setSymbol(Symbol);
      //   },
      //   (err) => {
      //     setError(err);
      //   }
      // );
    });
  }, [ENDPOINT, state]);

  // console.log(symbol);

  useEffect(() => {
    socket.on(
      "message",
      (Message) => {
        console.log(Message);
        setMessage(Message.text);
        const notify = () => toast(Message.text);
        notify();

        // console.log(Message.user);

        if (Message.leave) {
          const Notify = () => toast("Other user left!");
          Notify();
          setLeave(true);
          // console.log("leave karoo yrrrrrrrrrrrrrrr");
          history.push("/");
          // console.log(2);
        }
      },
      (err) => {
        setError(err);
      }
    );

    socket.on("roomData", (data) => {
      setPlayers(data.users);
    });
    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });

    return () => {
      socket.off();
      localStorage.removeItem("user");
      localStorage.removeItem("room");
      dispatch({ type: "REMOVE" });
    };
  }, [message, dispatch]);

  // console.log(players);

  // useEffect(() => {}, [players]);

  // const infoHandler = () => {
  //   setInfo((prevI) => !prevI);
  // };

  // const sendMessage = (event) => {
  //   event.preventDefault();

  //   if (message) {
  //     socket.emit("sendMessage", message, (err) => {
  //       setMessage(-1);
  //       setError(err);
  //     });
  //   }
  // };

  const makeMove = (row, col) => {
    // console.log(row, col);
    if (boardGame[row][col] !== -1) {
      setMessage("This box is filled. Please click on empty box");
      const notify = () =>
        toast("This box is filled. Please click on empty box");
      notify();
    } else if (!turn) {
      setMessage("Its not your turn, Please wait for your turn");
      const notify = () =>
        toast("Its not your turn, Please wait for your turn");
      notify();
    } else if (players.length !== 2) {
      setMessage("Please wait for other player to join");
      const notify = () => toast("Please wait for other player to join");
      notify();
    } else {
      socket.emit("move", { row, col }, (err) => {
        setError(err);
      });
    }
  };

  useEffect(() => {
    socket.on(
      "moveMade",
      ({ user, otherUser, board, winner, draw, message }) => {
        // console.log(board);
        setBoardGame(board);
        setMessage(message);
        // const notify = () => toast(message);
        // notify();
        setTurn((prev) => !prev);
        if (draw) {
          setMessages("The game is draw");
          setDraw(true);
          const notify = () => toast("The game is draw");
          notify();
          // setBoardGame(B);
          setGameOver(true);
        } else if (winner) {
          setMessages(`${winner} is the winner`);
          setWinner(winner);
          const notify = () => toast(`${winner} is the winner`);
          notify();
          // setBoardGame(B);
          setGameOver(true);
        }
      }
    );
  }, [boardGame, message]);
  // console.log(boardGame);

  // console.log(message, messages);
  // console.log(users);

  const clearError = () => {
    setError(null);
  };

  // console.log(messages);
  // console.log(gameOver);
  console.log(players);

  // const moveMadeHandler = (row, col) => {

  // }

  const leaveGame = () => {
    // socket.disconnected();
    // socket.off();
    // dispatch({ type: "REMOVE" });
    history.push("/");
  };

  return (
    <React.Fragment>
      {(error || !socketOn) && (
        <ErrorModal
          heading="Some Error Occured"
          message={
            (error || "Can't connect to the room.") + " Please try again."
          }
          onClick={clearError}
        />
      )}
      <ToastContainer autoClose={2000} />
      {gameOver && <GameOver winner={winner} draw={draw} />}
      {!gameOver && (
        <div className="gameOuterContainer">
          <img
            alt="Zero-Kata"
            className="headingImage"
            src="images/Zero-Kaata2.png"
          />
          <div>
            <Row className="details justify-content-between details-name">
              <Col className="col-12 col-lg-4 px-0 py-md-0 py-2">
                <span className="titleDetails">Name:</span>{" "}
                <span className="Name">{name}</span>
              </Col>

              {players.length === 2 && (
                <Col className="col-12 col-lg-4 px-0  py-md-0 py-2">
                  <span className="titleDetails">Other Player:</span>{" "}
                  <span className="Name">
                    {/* {players[0] && players[0].name} 
              {players[1] && players[1].name} */}
                    {name == players[0].name
                      ? players[1].name
                      : players[0].name}
                  </span>
                </Col>
              )}
              <Col className="col-2 px-0  py-md-0 py-2">
                <Button
                  variant="danger"
                  onClick={leaveGame}
                  style={{
                    float: "right",
                    margin: "0 !important",
                    width: "70px",
                  }}
                >
                  Leave
                </Button>
              </Col>
            </Row>
            {/* </div> */}
            <Row className="justify-content-between details align-items-center">
              <Col className="titleDetails col-md-3 p-0  py-md-0 py-2">
                Room Code:
              </Col>{" "}
              <Col className="code col-md-7  py-md-0 py-2"> {room}</Col>
              <Col className="col-md-2 colCopy  my-md-0 my-2">
                <Button
                  variant="success"
                  className="codeCopy"
                  onClick={() => navigator.clipboard.writeText(room)}
                >
                  Copy
                </Button>
              </Col>
            </Row>

            <div className="details">
              <span className="titleDetails">Symbol:</span>{" "}
              <span className="symbol symbolDetail">
                {" "}
                {symbol == -1 && " "}
                {symbol == 1 && "X"}
                {symbol == 0 && "0"}{" "}
              </span>
            </div>
            {/* <div>
            {messages.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
            {message}
          </div> */}
          </div>
          <div className="board">
            {boardGame.map((board, i) => (
              <div key={i} style={{ display: "flex" }}>
                {board.map((box, j) => (
                  <div
                    // style={{
                    //   width: "40px",
                    //   height: "40px",
                    //   border: "2px solid black",
                    // }}
                    // className
                    key={j}
                    onClick={() => {
                      makeMove(i, j);
                    }}
                    className={`box box-${i}-${j}`}
                  >
                    {boardGame[i][j] == -1 && "  "}
                    {boardGame[i][j] == 1 && <div className="X">X</div>}
                    {boardGame[i][j] == 0 && <div className="O">0</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {!gameOver && <div className="object3"></div>}
      {!gameOver && <div className="object4"></div>}
    </React.Fragment>
  );
};

export default Chat;
