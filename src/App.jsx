import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import SpecificItem from './components/SpecificItem';
import storeData from './storeData.json'
//import ReactWhatsapp from 'react-whatsapp';

// const Whatsapp = () => (
//   <ReactWhatsapp number="+972-58-677-0870" message="Hello World!!!" />
// );

export default function App() {
  return (
    <div className='position-relative'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home storeData={storeData}/>}/>
      <Route path='/shop' element={<Shop storeData={storeData}/>}/>
      <Route path='/shop/:itemId' element={<SpecificItem  storeData={storeData}/>}/>
      <Route path='/cart' element={<Cart storeData={storeData}/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}
