/* eslint-disable */
import React, { useState } from 'react';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import "./index.css"

function App() {
  const [page, setPage] = useState("/")
  return page === "/" ? <Home setPage={setPage} /> : <Dashboard setPage={setPage} />
  // return <Dashboard setPage={setPage} />
}

export default App;
