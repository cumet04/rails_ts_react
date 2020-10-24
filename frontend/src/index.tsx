import React from "react";
import ReactDOM from "react-dom";
import { Pages } from "./_pages";
import { App } from "./App";
import "ress";

const appDom = document.getElementById("app") as HTMLElement;
const data = JSON.parse(appDom.dataset.appJson || "");

const path = (appDom.dataset.pagePath as string) //
  .replace(/^\//, "") // trim initial slash
  .replace(/\/$/, "") // trim trailing slash
  .replace(/^$/, "index"); // "index" for "/"
const Page = Pages[path];

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Page props={data}></Page>
    </App>
  </React.StrictMode>,
  appDom
);
