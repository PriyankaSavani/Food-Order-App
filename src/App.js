import React, { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layouts/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './store/CartProvider'

const App = () => {

  const [cartIsShow, setCartIsShow] = useState(false);

  const handleShowCart = () => {
    setCartIsShow(true);
  };

  const handleHideCart = () => {
    setCartIsShow(false);
  };

  return (
    <CartProvider>
      {cartIsShow && <Cart onHandleHideCart={handleHideCart} />}
      <Header onHandleShowCart={handleShowCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App