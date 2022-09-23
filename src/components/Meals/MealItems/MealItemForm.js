import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import './MealItemForm.css'

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const enterAmount = amountInputRef?.current.value;

        const enterAmountNumber = +enterAmount;

        if (enterAmount.trim().length === 0 || enterAmountNumber < 1 || enterAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enterAmountNumber);
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>Add</button>
            {!amountIsValid && <p>Plaese enter valid amount(1-5).</p>}
        </form>
    )
}

export default MealItemForm