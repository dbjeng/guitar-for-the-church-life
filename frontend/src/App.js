import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from "./scenes/Layout";
import Home from "./scenes/Home";
import ChordFilter from './scenes/ChordFilter';

function App() {
  return (    
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>          
          <Route path='/' element={<Home />} />
          <Route path='/ChordFilter' element={<ChordFilter />} />    
        </Route>    
      </Routes>
    </BrowserRouter>
  )
}

export default App
