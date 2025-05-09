import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/state.jsx";
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <UserProvider>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
          </UserProvider>
  </React.StrictMode>
);
