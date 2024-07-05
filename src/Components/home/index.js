import React from 'react'
 
 import Bid from "./home-page/Bid.js"
 import Top from './home-page/Top.js'
 import  Featured  from './home-page/Featured.js'
 import LocalOfferz from './home-page/LocalOfferz.js'
 import Live from './home-page/Live.js'
 import Archieved from './home-page/Archieved.js'
 import Partners from './home-page/Partners.js'
 import Makes from './home-page/Makes.js'
 import Header from '../header/Header/Header.js'


const Home = () => {
  return (
    <>
   <Header/>
    <Bid/>
    <Top/>
    <Featured/>
    <LocalOfferz/>
    <Live/>
    <Archieved/>
    <Partners/>
    <Makes/>
  

    </>
  )
}

export default Home