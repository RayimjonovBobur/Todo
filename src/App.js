import "./App.css";
import AddTodo from "./Components/AddTodo/AddTodo";
import ListTodo from "./Components/./ListTodo/ListTodo";
import styled from "styled-components";

const Main = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

function App() {
  return (
    <Main className="App">
      <AddTodo />
      <ListTodo />
    </Main>
  );
}

export default App;
