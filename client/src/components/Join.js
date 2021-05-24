import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { UserContext } from "../../../../client/src/App";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../App";
import { Button, Form } from "react-bootstrap";

import "./Join.css";

const Join = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [newRoom, setNewRoom] = useState(true);

  useEffect(() => {
    if (newRoom) {
      setRoom(uuidv4());
    } else setRoom("");
  }, [newRoom]);

  const createNewRoom = () => {
    console.log(name);
    console.log(room);
    if (!name || !room) return;
    localStorage.setItem("user", JSON.stringify(name));
    localStorage.setItem("room", JSON.stringify(room));
    dispatch({ type: "USER", payload: { user: name, room: room } });

    history.push("/game");
  };

  const joinRoom = () => {
    console.log(name);
    console.log(room);
    if (!name || !room) return;
    localStorage.setItem("user", JSON.stringify(name));
    localStorage.setItem("room", JSON.stringify(room));
    dispatch({ type: "USER", payload: { user: name, room: room } });

    history.push("/game");
  };

  return (
    <React.Fragment>
      <div className="joinInnerInnerContainer">
        {/* <h1 className="heading">Zero Kata</h1> */}
        <img
          src={"/images/Zero-Kaata2.png"}
          alt="Heading"
          className="headingLogo"
        />
        {/* <Image src="/images/photo-1505765050516-f72dcac9c60e.jpg" rounded /> */}
        <h4 className="subheading">Create New Room</h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            className="joinInput"
            type="text"
            placeholder="Enter Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </Form.Group>
        {!newRoom && (
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="joinInput"
              type="text"
              placeholder="Enter Room Code"
              onChange={(event) => setRoom(event.target.value)}
              value={room}
            />
          </Form.Group>
        )}
        {/* <div>
        <input placeholder="Name" type="text" />
      </div> */}
        {newRoom ? (
          <Button
            variant="success"
            className="buttonJoin-1"
            type="submit"
            onClick={createNewRoom}
          >
            Create Room
          </Button>
        ) : (
          <Button
            variant="success"
            className="buttonJoin-1"
            type="submit"
            onClick={joinRoom}
          >
            Join Room
          </Button>
        )}
        <hr></hr>
        <Button
          variant="outline-success"
          className="buttonJoin-2"
          type="submit"
          onClick={() => {
            setNewRoom((prev) => !prev);
          }}
        >
          {newRoom ? "Join Room" : "Creat New Room"}
        </Button>
      </div>
      <div className="object1"></div>
      <div className="object2"></div>
    </React.Fragment>
  );
};

export default Join;
