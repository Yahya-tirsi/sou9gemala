import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // 👈 IMPORTER AVANT TOUT
import { Provider } from 'react-redux'
import "./index.css";
import App from "./App.jsx";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
