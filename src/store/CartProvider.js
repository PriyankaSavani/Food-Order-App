import React, { useReducer } from 'react'
import CartContext from './CartContext'

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const updateTotalamount = state.totalAmount + action.item.price * action.item.amount;

        const existCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existCartItem = state.items[existCartItemIndex];

        let updateItems;
        if (existCartItem) {
            const updateItem = {
                ...existCartItem,
                amount: existCartItem.amount + action.item.amount
            };
            updateItems = [...state.items];
            updateItems[existCartItemIndex] = updateItem;
        } else {
            updateItems = state.items.concat(action.item);
        }
        return {
            items: updateItems,
            totalAmount: updateTotalamount
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const handleAddItemToCart = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const handleRemoveItemFromCatt = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        additem: handleAddItemToCart,
        removeItem: handleRemoveItemFromCatt,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider