import React, { useEffect } from "react";
import axios from "axios";
import "./App.scss";
import { csvJSON } from "./utility/commonFunctions";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Stocks from "./pages/Stocks";
import Quotes from "./pages/Quotes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/stocks" />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/quotes/:symbol" element={<Quotes />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
