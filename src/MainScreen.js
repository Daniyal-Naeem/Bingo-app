import React, { useState, useEffect } from "react";
import shuffle from "shuffle-array";
import "./styles.css";

import {start}  from "./Confetti";

const Confetti = () => {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}
const Tile = ({ id, children, onToggle, isSet }) => {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const message = [
  "didn't slept lastnight",
  "not going to school",
  "Van has arrive",
  "having stomach pain",
  "forgot my book at home",
  "forgot to bring lunch",
  "monthly test",
  "exams ",
  "preparation for the tst",
  "going washroom",
  "punishment",
  "It’s only a test",
  "bunking the class",
  "fake attandance ",
  "assembly",
  "prayer",
  "Can’t wait to share results ",
  "Good grades ",
  "High quality content",
  "fail ",
  "pass ",
  "front roll",
  "playing sports",
  "late",
  "absent"
];

const data = shuffle(message).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

const MainScreen = () => {
  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <h1>Bingo</h1>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      {state.won ? <Confetti/> : null}
    </div>
  );
}

export default MainScreen;
