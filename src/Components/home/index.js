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

 import Aboutdest from '../about/about-page/Aboutdest.js'

const Home = () => {
  return (
    <>
    <Header/>
    <Bid/>
    <Top/>
    <BuyNow/>
    {/* <LocalOfferz/> */}
    <BidNow/>
    
    <Aboutdest/>
    <Abouttest/>
    {/* <Live/> */}
    {/* <Archieved/> */}
    {/* <Partners/> */}
    <Makes/>
  

    </>
  )
}

export default Home