import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {createHashRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,

  document.getElementById("hero-app") as HTMLElement
);
