import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Styles
import "./assets/css/bootstrap/bootstrap.css";
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
import "./assets/css/main.min.css";
import "./assets/css/custom.css";

// Components
import Todo from "./Components/Todo";
import Notes from "./Components/Notes";
import Home from "./Components/Home";
import Nav from "./Components/Nav";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <div>
            <Nav />
            <div className="container">
              <Home />
            </div>
          </div>
        } />

        <Route path="/todo" element={
          <div>
            <Nav />
            <div className="container">
              <Todo />
            </div>
          </div>
        } />
        <Route path="/notes" element={
          <div>
            <Nav />
            <div className="container">
              <Notes />
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}