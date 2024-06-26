import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home/index.js';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
 import ContactUs from './Components/ContactUs';
 import HowWorks from './Components/HowWorks';
 import Help from './Components/Help';
 import About from './Components/About';
 import Header from './Components/Header.js';

function App() {
  return (
     <>
    <Router>
      <div className="App">
        <Header/>
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/HowWorks" element={<HowWorks/>}/>
          <Route path="/Help" element={<Help/>}/>
          <Route path="/About" element={<About/>}/>


        </Routes>
        {/* Include the Footer component so it appears on all pages */}
        <Footer />
      </div>
    </Router>
     </>
  );
}

export default App;
