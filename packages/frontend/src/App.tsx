import { BrowserRouter, Route, Routes } from "react-router";
import ToDoList from "./components/page/ToDoList";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import Hello from "./components/page/Hello";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
