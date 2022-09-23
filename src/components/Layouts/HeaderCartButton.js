import React, { useContext } from 'react'
import CartContext from '../../store/CartContext'
import './HeaderCartButton.css'

const HeaderCartButton = (props) => {

    const CartCTX = useContext(CartContext);

    const numberOfCartItems = CartCTX.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return (
        <button className='button' onClick={props.onShowCart}>
            <span className='icon'></span>
            <span>Your Cart</span>
            <span className='badge'>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton