import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid red;
`;

const Title = styled.h1`
  color: gray;
`;

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  // useEffect is a hook for encapsulating code that has 'side effects,' and is like a combination of componentDidMount , componentDidUpdate , and componentWillUnmount. Previously, functional components didn't have access to the component life cycle, but with useEffect you can tap into it. The Effect Hook lets you perform side effects in function components.

  // What does useEffect do? By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.

  // Why is useEffect called inside a component? Placing useEffect inside the component lets us access the isActive state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope.

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setInitialTime((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && initialTime !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, initialTime]);

  const handleReset = () => {
    setIsActive(false);
    setInitialTime(0);
  };

  const Button = styled.button`
    background-color: ${(props) => (props.success ? "green" : "red")};
  `;

  // command + click allows you to quickly access code snippet details.
  // styled components is a prodcutivity booster. Allows styling conditioanls and is much cleaner code than grabbing classes and id's.

  return (
    <Container>
      <Title>Timer: {initialTime}</Title>
      <Button success onClick={() => setIsActive((prev) => !prev)}>
        {isActive ? "Pause" : "Start"}
      </Button>
      <Button danger onClick={handleReset}>
        Reset
      </Button>
      <Button>Record</Button>
    </Container>
  );
};

export default App;

// functionality should start, pause, reset, and record.
