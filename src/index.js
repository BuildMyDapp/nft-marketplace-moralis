import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "antd/dist/antd.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { GlobalProvider } from './context/GlobalState';
// import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  // <MoralisProvider appId="ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d" serverUrl="https://zrgs9ntgp1xg.grandmoralis.com:2053/server">
  <GlobalProvider>
  <App />
</GlobalProvider>
// </MoralisProvider>
,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
