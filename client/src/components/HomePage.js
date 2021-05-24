import React from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { useHistory } from "react-router";

import "./HomePage.css";

const Home = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className="homeOuterConatiner">
        <div>
          <img
            className="mainHeading"
            src={"/images/Zero-Kaata2.png"}
            alt="zero-katta"
          />
        </div>
        <Row className="contentRow justify-content-around align-items-center mx-0 ">
          <Col className="col-12 col-sm-11 col-md-10 col-lg-6 col-xl-5 ">
            <Row className="left mx-0">
              <Col className="instructions mb-2 px-3">
                <h1 className="rules">Rules for Tic-Tac-Toe</h1>
                <div>1. Play occurs on a 3 by 3 grid of 9 empty squares.</div>
                <div>
                  2. Two players alternate marking empty squares, the first
                  player marking Xs and the second player marking Os.
                </div>
                <div>
                  3. If one player places three of the same marks in a row, that
                  player wins.
                </div>
                <div>
                  4. If the spaces are all filled and there is no winner, the
                  game ends in a draw.
                </div>
              </Col>
              <Col className="instructions mt-2 px-3">
                <div className="info">
                  Zero Kata in India is same as <span>Tic Tak Toe</span> or{" "}
                  <span>Nougths and Crosses</span> or
                  <span> Xs and Os</span>{" "}
                </div>
              </Col>
            </Row>
          </Col>
          {/* <Col className="col-3">
          
        </Col> */}
          <Col className="col-12 col-sm-11 col-md-10 col-lg-6 col-xl-5 mb-5 mb-lg-0 ">
            <Row style={{ flexDirection: "column", alignItems: "center" }} className="mx-0">
              <Col className="playDiv pb-3">
                <Button
                  className="playButton instructions"
                  size="lg"
                  onClick={() => history.push("/join")}
                >
                  Play Now
                </Button>
              </Col>
              <Col className=" instructions gameImg pb-2">
                <h3 className="happy">HAPPINESS IS</h3>
                <img className="gameImage" src={"/images/ZK-Loadpage.png"} />
                <h4 className="winning">...winning at tic tac toe</h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="object5"></div>
      <div className="object6"></div>
      <div className="object7"></div>
      <div className="object8"></div>
      <div className="object9"></div>
      <div className="object10"></div>
      <div className="object11"></div>
      {/* <div className="object12"></div> */}
    </React.Fragment>
  );
};

export default Home;
