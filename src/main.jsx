import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/state.jsx";
import { UserProvider } from './context/UserContext';
import QueryProvider from "./providers/QueryProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <UserProvider>
        <Provider>
          <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    </UserProvider>
    </QueryProvider>
  </React.StrictMode>
);
