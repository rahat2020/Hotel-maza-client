import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Hotels from './Pages/Hotels/Hotels';
import List from './Pages/List/List';

const App = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/hotels" element={<List/>}/>
          <Route path="/hotels/:id" element={<Hotels/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App