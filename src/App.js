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
import Profile from './Components/user-page/user-pages/Profile.js'
import Offers from './Components/user-page/user-pages/Offers.js';
import Order from './Components/user-page/user-pages/Order.js';
import Verification from './Components/sign-up/sign-page/Verification.js';
import VerifyEmail from './Components/verifyEmail/index.js';
import ResetPassword from './Components/Login/login-page/ResetPassword.js';
import ForgotPassword from './Components/Login/login-page/ForgotPassword.js';
import UploadVehiclePage from './Components/upload-vehicle/index.js';
import Funds from './Components/user-page/user-pages/Funds.js';
function App() {
  return (
     <>
    <Router>
      <div className="App">
       
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/verify-email/:token" element={<VerifyEmail/>}/>
          <Route path="/user/documents-upload" element={<Verification/>}/>

          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/HowWorks" element={<HowWorks/>}/>
          <Route path="/Help" element={<Help/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/PrivacyPolicies" element={<Privacy/>} />
          <Route path="/Terms&Conditions" element={<Term/>} />
          <Route path="/LoanApplication" element={<Loan />} />
          <Route path="/hi" element={<UploadVehiclePage />} />

          <Route path="/UserAccount" element={<UserAccount/>}/>
          <Route path="/UserAccount/allbids" element={<UserLayout> <AllBids/> </UserLayout>}/>
          <Route path="/user/profile" element={<UserLayout> <Profile/> </UserLayout>}/>
          <Route path="/UserAccount/Offers" element={<UserLayout> <Offers/> </UserLayout>}/>
          <Route path="/UserAccount/Order" element={<UserLayout> <Order/> </UserLayout>}/>
          <Route path="/UserAccount/Funds" element={<UserLayout> <Funds/> </UserLayout>}/>

        </Routes>
        {/* Include the Footer component so it appears on all pages */}
        <Footer />
      </div>
    </Router>
     </>
  );
}

export default App;
