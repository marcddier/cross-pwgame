import React, { useState } from "react";
import useInput from "../hooks/useInput.ts";

const AskNickname = ({ io }) => {
  // const [nickname, setNickname] = useState("");

  const [nickname, bindNickname, resetNickname] = useInput('');

  const sendNickname = () => {
    io.emit("event::initialize", { nickname });
  };

  return (
    <div className="field">
      <div className="control">
        <input className="input" {...bindNickname} />
      </div>
      <div className="control">
        <a className="button is-info" onClick={sendNickname}>
          Send
        </a>
      </div>
    </div>
  );
};

export default AskNickname;
