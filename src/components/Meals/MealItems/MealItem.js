import React, { useContext } from 'react'
import CartContext from '../../../store/CartContext'
import './MealItem.css'
import MealItemForm from './MealItemForm'

const MealItem = (props) => {

    const CartCTX = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const handleAddToCart = (amount) => {
        CartCTX.additem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    }

    return (
        <li className='meal'>
            <div>
                <h3>{props.name}</h3>
                <div className='description'>{props.description}</div>
                <div className='price'>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={handleAddToCart} />
            </div>
        </li>
    )
}

export default MealItem