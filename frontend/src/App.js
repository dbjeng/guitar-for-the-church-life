import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import KeyChordTable from './pages/KeyChordTable';
import Layout from './pages/Layout';
import SongFilter from './pages/SongFilter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="keyChordTable" element={<KeyChordTable />} />
            <Route path="songFilter" element={<SongFilter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
