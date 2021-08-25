import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import "./styles.css";
import { App } from "./app";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
