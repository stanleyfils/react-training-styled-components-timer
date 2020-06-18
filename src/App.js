import React, { useState, useEffect } from "react";
import styled from "styled-components";

// you can nest regular CSS classes inside of styled components! When using styled components, you don't have to make every component a styled component. You have options!
const Container = styled.div`
  border: ${({ theme }) => `3px solid ${theme.darkerGray}`};
  width: 200px;
  height: 120px;
  margin: 0 auto;

  .race {
    color: black;
    font-size: 16px;
    font-weight: bold;
  }

  /* Example of nesting CSS classes. This is the same as using the Title styled-component. */
  /* h1 {
    color: ${(props) => props.theme.darkGray};
  } */
`;

// since App.js is a child of Theme, App.js (and anything else wrapped in between Theme in index.js) has access to ThemeProvider (context)
const Title = styled.h1`
  color: ${(props) => props.theme.darkGray};
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
      <div className="race">Ready, Set, Go!</div>
      <Button success onClick={() => setIsActive((prev) => !prev)}>
        {isActive ? "Pause" : "Start"}
      </Button>
      <Button danger onClick={handleReset}>
        Reset
      </Button>
      {/* this conditional sets the record feature to the record button. Consider DOM reconiliation. Setting else conditional to null removes the record button when not an option in order to give React less html elements to map through */}
      {isActive && initialTime !== 0 ? <Button>Record</Button> : null}
    </Container>
  );
};

export default App;

// functionality should start, pause, reset, and record.
