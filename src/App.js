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
import Contact from "./Components/Contact/index.js";
import HowWorks from "./Components/howWork/howWork-page/HowWorks.js";
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
import LiveAuction from "./Components/live-auction/index.js";
import List from "./Components/live-aution-search/live-auction-search/List.js";
import DynamicForm from "./Components/prac/DyanmicForm.jsx";
import Test from "./Components/prac/Test.jsx";
import Helpsec from "./Components/help/index.js";
import Invoices from "./Components/invoices/index.js";
import SavedSearchPage from "./Components/saved-searches/index.js";
import TransactionPage from "./Components/transaction-history/index.js"
import ProbiddingPage from "./Components/pro-bidding-tips/index.js"



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
            if (elapsed >= 7200000) {
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
          <Header/>
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

            <Route path="/contact-us" element={<Contact />} />
            <Route path="/how-it-works" element={<HowWorks />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/pro-bidding-tips" element={<ProbiddingPage />} />
            <Route path="/help" element={<Helpsec />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policies" element={<Privacy />} />
            <Route path="/terms&conditions" element={<Term />} />

            <Route path="/apply-for-loan" element={
              <ProtectedRoute>
              <Loan />
              </ProtectedRoute>
              } />
            <Route
              path="/upload-local-car"
              element={
                <ProtectedRoute>
                  <UploadVehiclePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/live-auction-search"
              element={
                <ProtectedRoute>
                  <List/>
                </ProtectedRoute>
              }
            />
               <Route
              path="/live-auction-portal"
              element={
                <ProtectedRoute>
                  <LiveAuction/>
                </ProtectedRoute>
              }
            />


            <Route
              path="/user/get-all-invoices"
              element={
                <>
                  <ProtectedRoute>
                    <Invoices />
                  </ProtectedRoute>
                </>
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
              path="/user/account/profile"
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
              path="/user/account/transactions"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <TransactionPage />
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
            <Route path="/saved-searches" element={ <ProtectedRoute><SavedSearchPage /></ProtectedRoute>} />
            <Route path="/Successfull-login" element={<Successfull_Login />} />
            <Route path="/vehicle-detail/:lotID" element={<Vehicle />} />
            <Route path="/local-vehicle-detail/:id" element={<LocalVehicle />} />
            <Route path="/test" element={<Test />} />
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
