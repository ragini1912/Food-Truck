import React from "react";
import { createRoot } from "react-dom/client"; // Ensures you're using the newer React 18 API
import App from "./App";
import "./index.css"; // Assuming you have global styles here
import { DarkModeContextProvider } from "./context/darkModeContext"; // Context provider from index (2).js

const container = document.getElementById("root");

// Check if the root container exists (good practice from index (2).js)
if (!container) {
  throw new Error(
    "Failed to find the root element. Ensure your public/index.html has an element with id='root'."
  );
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);
