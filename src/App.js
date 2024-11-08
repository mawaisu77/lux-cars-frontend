import Fees from "./Components/fees/index.js";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./Components/home/index.js";
import Login from "./Components/Login/login-page/Login.js";
import Signup from "./Components/sign-up/index.js";
import ContactUs from "./Components/Contact/Cantact-page/ContactUs.js";
import HowWorks from "./Components/howWork/howWork-page/HowWorks.js";
import Help from "./Components/help/help-page/Help.js";
import About from "./Components/about/index.js";
import Header from "./Components/header/Header/Header.js";
import UserAccount from "./Components/user-page/index.js";
import UserLayout from "./Components/layouts/UserLayout.jsx";
import AllBids from "./Components/user-page/user-pages/AllBids.js";
import Privacy from "./Components/privacy/index.js";
import Term from "./Components/term/index.js";
import Loan from "./Components/loanapplication/index.js";
import Profile from "./Components/user-page/user-pages/Profile.js";
import Offers from "./Components/user-page/user-pages/Offers.js";
import Order from "./Components/user-page/user-pages/Order.js";
import Verification from "./Components/sign-up/sign-page/Verification.js";
import VerifyEmail from "./Components/verifyEmail/index.js";
import ResetPassword from "./Components/Login/login-page/ResetPassword.js";
import ForgotPassword from "./Components/Login/login-page/ForgotPassword.js";
import UploadVehiclePage from "./Components/upload-vehicle/index.js";
import Funds from "./Components/user-page/user-pages/Funds.js";
import ProtectedRoute from "./utils/ProtectedRoutes.js";
import SearchPage from "./Components/SearchPage/index.js";
import Successfull_Login from "./Components/successfullLogin/index.jsx";
import Vehicle from "./Components/vehicle/index.js";
import Review from "./Components/review/index.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext.js";
import Parts from "./Components/user-page/user-pages/Parts.js";
import SavedCars from "./Components/user-page/user-pages/SavedCars.js";
import useGetSavedCars from "./hooks/useGetUserSavedCars.js";
import ScrollToTop from "./utils/ScrollToTop.js";
import LocalVehicle from "./Components/localcars-details/index.js";
import LocalCarsSearchPage from "./Components/localCars-search/index.js";
import LocalCars from "./Components/user-page/user-pages/LocalCars.js";
import FooterSec from "./Components/Footer/index.js";

function App() {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const checkReviewPopup = () => {
      if (user && user.email) {
        const now = new Date().getTime();
        const loginTime = localStorage.getItem(`loginTime_${user.email}`);
        const hasReviewed = localStorage.getItem(`hasReviewed_${user.email}`);

        if (!hasReviewed) {
          if (!loginTime) {
            localStorage.setItem(`loginTime_${user.email}`, now);
          } else {
            const elapsed = now - loginTime;
            if (elapsed >= 10000) {
              // For testing purpose time is set to 10 seconds
              setShowReviewPopup(true);
            }
          }
        }
      }
    };

    checkReviewPopup();

    const interval = setInterval(checkReviewPopup, 1000); 

    return () => clearInterval(interval);
  }, [user]);


  const handleClosePopup = () => {
    if (user && user.email) {
      setShowReviewPopup(false);
      localStorage.removeItem(`loginTime_${user.email}`);
    }
  };

  

  return (
    <>
      <Router>
        <div>
          {showReviewPopup && <Review user={user} onClose={handleClosePopup} />}
        </div>
        <div className="App">
          <ScrollToTop />
          {/* <Header/> */}
          {/* Define your routes here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                // <ProtectedRoute>
                <ResetPassword />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/user/documents-upload"
              element={
                <ProtectedRoute>
                  <Verification />
                </ProtectedRoute>
              }
            />

            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/how-works" element={<HowWorks />} />
            <Route path="/Fees" element={<Fees />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policies" element={<Privacy />} />
            <Route path="/terms&conditions" element={<Term />} />
            <Route path="/loan-application" element={<Loan />} />
            <Route
              path="/upload-car"
              element={
                <ProtectedRoute>
                  <UploadVehiclePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/account"
              element={
                <>
                  <ProtectedRoute>
                    <UserAccount />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/user/account/all-bids"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <AllBids />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Profile />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/account/offers"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Offers />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/account/order"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Order />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/account/parts"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Parts />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/account/funds"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Funds />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/account/saved-cars"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <SavedCars />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
             <Route
              path="/user/account/local-cars"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <LocalCars />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/search-page" element={<SearchPage />} />
            <Route path="/Successfull-login" element={<Successfull_Login />} />
            <Route path="/vehicle-detail/:lotID" element={<Vehicle />} />
            <Route path="/local-vehicle-detail/:id" element={<LocalVehicle />} />
            <Route
              path="/search-local-cars"
              element={<LocalCarsSearchPage />}
            />
            <Route path="/review" element={<Review />} />
            <Route path="/admin/dashboard" element={<>welcome</>} />
          </Routes>
          {/* Include the Footer component so it appears on all pages */}
          <FooterSec />
        </div>
      </Router>
    </>
  );
}

export default App;
