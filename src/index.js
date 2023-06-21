import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { CartProvider } from './context/useCart';
import { PopularProvider } from './context/usePopular';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <CartProvider>
    <PopularProvider>
    <App />
    </PopularProvider>
  </CartProvider>
  </BrowserRouter>
);