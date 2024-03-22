import React from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "App";
import reportWebVitals from "reportWebVitals";
import { store } from "storage/redux/store";

import "assets/font/fontawesome/css/fontawesome.css";
import "assets/font/fontawesome/css/solid.css";
import "assets/font/pretendard/pretendard.css";
import "assets/css/react-datepicker.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
