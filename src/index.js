import ReactDOM from "react-dom";
import React from "react";
import "antd/dist/antd.css";
import "./styles.css";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
