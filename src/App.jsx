import React, { useEffect, useState, useRef } from "react";
import { Eye, EyeOff, Clipboard } from "lucide-react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(10);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [eye, setEye] = useState(true);
  const [hide, setHide] = useState("password");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null); 
  useEffect(() => {
    setHide(eye ? "text" : "password");
  }, [eye]);

  const passwordGenerator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (char) str += "!@#$%^&*(){}:?";
    if (number) str += "123456789";

    for (let i = 0; i < range; i++) {
      let num = Math.floor(Math.random() * str.length);
      pass += str[num];
    }
    setPassword(pass);
    setCopied(false); 
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    inputRef.current.select(); 
    setTimeout(() => setCopied(false), 1500); 
  };

  return (
    <div className="container">
      <div className="password-box">
        <input
          ref={inputRef}
          className={`password-input ${copied ? "highlight" : ""}`}
          type={hide}
          value={password}
          placeholder="Generated Password"
          readOnly
        />
        <button className="copy-btn" onClick={copyPassword}>
          <Clipboard size={18} />
        </button>
        <button className="eye-btn" onClick={() => setEye(!eye)}>
          {eye ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      <div className="controls">
        <div className="slider-box">
          <input
            className="slider"
            min={6}
            max={10}
            type="range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
          <p>Length: {range}</p>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={number}
            onChange={(e) => setNumber(e.target.checked)}
          />
          Include Numbers
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={char}
            onChange={(e) => setChar(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>

      <button className="generate-btn" onClick={passwordGenerator}>
        Generate Password
      </button>
    </div>
  );
};

export default App;
