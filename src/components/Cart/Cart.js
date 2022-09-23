import React, { useContext, useState } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import './Cart.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {

    const [isCheckOut, setIsCheckOut] = useState(false);

    const CartCTX = useContext(CartContext);
    const totalAmount = `$${CartCTX.totalAmount.toFixed(2)}`;

    const hasItems = CartCTX.items.length > 0;

    const handleAddCartItem = (item) => {
        CartCTX.additem({ ...item, amount: 1 })
    };

    const handleRemoveCartItem = (id) => {
        CartCTX.removeItem(id)
    };

    const handleOrder = () => {
        setIsCheckOut(true)
    }

    const handleSubmitOrder = (userData) => {
        fetch('https://practice-project-2d43c-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: CartCTX.items
            })
        })
    }

    return (
        <Modal onHideCart={props.onHandleHideCart}>
            <ul className='cart-items'>
                {(CartCTX.items || []).map((cartItem) => {
                    return (
                        <CartItem
                            key={cartItem.id}
                            name={cartItem.name}
                            price={cartItem.price}
                            amount={cartItem.amount}
                            onRemove={handleRemoveCartItem.bind(null, cartItem.id)}
                            onAdd={handleAddCartItem.bind(null, cartItem)}
                        />
                    )
                })}
            </ul>
            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut ? (
                <Checkout onConfirm={handleSubmitOrder} onCancle={props.onClose} />
            ) : (
                <div className='actions'>
                    <button className='button--alt' onClick={props.onHandleHideCart}>Close</button>
                    {hasItems && <button className='button' onClick={handleOrder}>Order</button>}
                </div>
            )}
        </Modal>
    )
}

export default Cart