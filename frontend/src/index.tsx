import React from "react";
import ReactDOM from "react-dom";
import "ress";

const appDom = document.getElementById("app") as HTMLElement;
const data = JSON.parse(appDom.dataset.appJson || "");

ReactDOM.render(
  <React.StrictMode>
    <p>{data.user.name}</p>
  </React.StrictMode>,
  appDom
);
