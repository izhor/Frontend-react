//import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import BookManagement from "./components/bookmanagement";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios  from 'axios';
import swal from 'sweetalert';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/book-management" exact element={<BookManagement/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
