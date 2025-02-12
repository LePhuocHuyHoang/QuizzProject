import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import React from "react";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        test link
        <div>
          <button>
            <Link to="/users">go to user page</Link>
          </button>
          <button>
            <Link to="/admin">go to admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
