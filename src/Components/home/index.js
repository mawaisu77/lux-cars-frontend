import React from 'react'
 
 import Bid from "./home-page/Bid.js"
 import Top from './home-page/Top.js'
 import  BuyNow  from '../cards/Featured.js'
 import LocalOfferz from '../cards/LocalOfferz.js'
 import Live from '../cards/Live.js'
 import Archieved from '../cards/Archieved.js'
 import Partners from './home-page/Partners.js'
 import Makes from './home-page/Makes.js'
 import Header from '../header/Header/Header.js'
 import Abouttest from '../about/about-page/Abouttest.js'
 import BidNow from '../cards/BuyNow.js'
 import BidCarsSection from '../cards/BidCarsSection.js'
import Aboutdest from '../about/about-page/Aboutdest.js'
import LocalCars from '../cards/LocalCarsSection.js'
import MotorCycleSection from '../HomeSections/MotorCyclesSection.js'
import BoatSection from '../HomeSections/BoatSection.js'
import ATVSection from '../HomeSections/ATVSection.js'
import { ErrorBoundary } from '@sentry/react'
import Registration from './home-page/Registration.js'
import Notifications from '../../utils/Notifications.js'
import NotificationDropdown from '../ui/dropdowns/NotificationDropdown.jsx'

const Home = () => {
  

  return (
    <>
    {/* <Header/> */}
    <Bid/>
    <Top/>
    <BidCarsSection />
    <Makes/>
     <BuyNow/>
    {/* <LocalOfferz/> */}
    <BidNow/>
    <LocalCars />
    {/* <MotorCycleSection />
    <BoatSection />
    <ATVSection /> */}
    <Aboutdest/>
    <Abouttest/>
    {/* <Live/> */}
    {/* <Archieved/> */}
    {/* <Partners/> */}
    <Registration/>
 

    </>
  )
}

export default Home