import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home/index.js';
import Footer from './Components/Footer/index.js';
import Login from './Components/Login/login-page/Login.js';
import Signup from './Components/sign-up/index.js';
 import ContactUs from './Components/Contact/Cantact-page/ContactUs.js';
 import HowWorks from './Components/howWork/howWork-page/HowWorks.js';
 import Help from './Components/help/help-page/Help.js';
 import About from './Components/about/index.js';
 import Header from './Components/header/Header/Header.js';
import UserAccount from './Components/user-page/index.js';
import UserLayout from './Components/layouts/UserLayout.jsx';
 import AllBids from './Components/user-page/user-pages/AllBids.js';
import Privacy from './Components/privacy/index.js';
import Term from './Components/term/index.js'; 
import Loan from './Components/loanapplication/index.js';
import Fees from './Components/fees/index.js';
function App() {
  return (
     <>
    <Router>
      <div className="App">
       
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/HowWorks" element={<HowWorks/>}/>
          <Route path="/Help" element={<Help/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/PrivacyPolicies" element={<Privacy/>} />
          <Route path="/Terms&Conditions" element={<Term/>} />
          <Route path="/LoanApplication" element={<Loan />} />
          <Route path="/Fees" element={<Fees />} />

          <Route path="/UserAccount" element={<UserAccount/>}/>
          <Route path="/UserAccount/allbids" element={<UserLayout> <AllBids/> </UserLayout>}/>
          <Route path="/UserAccount/funds" element={<UserLayout> <div>hello 2nd page</div></UserLayout>}/>


        </Routes>
        {/* Include the Footer component so it appears on all pages */}
        <Footer />
      </div>
    </Router>
     </>
  );
}

export default App;
