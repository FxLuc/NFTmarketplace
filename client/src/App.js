import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/sass/index.scss";

import Layout from "./components/Layout";

function App() {
  return (
    <React.StrictMode>
      <div className="mt-5">
        <Layout />
      </div>
    </React.StrictMode>
  );
}

export default App;
