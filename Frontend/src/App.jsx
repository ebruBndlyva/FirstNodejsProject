import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />

      <Route path=":id" element={<Detail/>}></Route>
    </Routes>
  );
}

export default App;
