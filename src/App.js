import React, { useState } from "react";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  return (
    <div>
      <h1>Timer: {initialTime}</h1>
      <button>{isActive ? "Pause" : "Start"}</button>
      <button>Reset</button>
    </div>
  );
};

export default App;

// functionality should start, pause, reset, and record.
