import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <h1>My React App!</h1>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);