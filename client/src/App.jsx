import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";

const App = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const io = socketIO("http://localhost:3000");

  io.on("event::hello", () => {
    console.log("handshake");
  });

  io.on("event::gameStarted", () => {
    console.log("game started");
    setGameStarted(true);
  });

  io.on("event::gameFull", () => {
    console.log("game full");
  });

  io.on("event::magicNumberState", payload => {
    switch (payload.state) {
      case "win": 
        console.log('win')
        break;
      case "higher": 
        console.log("higher")
        break;
      case "lower": 
        console.log("lower")
        break; 
    }
  });

  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-head">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>PWA Games</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            {!isGameStarted ? <AskNickname io={io} /> : <MagicNumber />}
          </header>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>Let's Rock!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
