import { BrowserRouter, Route, Routes } from "react-router";
import ToDoList from "./components/page/ToDoList";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";

export default function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/todo" element={<ToDoList />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>;
}
