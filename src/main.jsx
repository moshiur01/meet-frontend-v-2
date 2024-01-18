import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";

const customToastStyle = {
  zIndex: "9999999",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{ style: customToastStyle }}
    />

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
