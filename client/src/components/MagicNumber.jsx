import React, { useState, useEffect } from "react";

const MagicNumber = ({ io }) => {
  const [number, setNumber] = useState(0);
  const [answer, setAnswer] = useState("enter number");
  const [winner, setWinner] = useState("");

  const handleMagicNumber = event => {
    setNumber(event.target.value);
  }

  const sendMagicNumber = () => {
    io.emit("event::magicNumber", { number });
    setWinner('');
  }

  useEffect(() => {
    io.on("event::magicNumberState", payload => {
      console.log(payload);
      setAnswer(payload.state);
    });

    io.on("event::magicNumberWin", payload => {
      console.log(payload);
      setWinner(payload.winner+' won the last set');
    });
  }, []);

  return (
    <div className="field">
      <h1>Magic Number (0 - 1000)</h1>
      <div className="control">
        <input className="input" onChange={handleMagicNumber} value={number} />
      </div>
      <span>{answer}</span>
      <div className="control">
        <a className="button is-info" onClick={sendMagicNumber }>
          Send
        </a>
      </div>
      <h2>{winner}</h2>
    </div>
  )
};

export default MagicNumber;
