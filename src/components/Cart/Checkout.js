import React, { useRef, useState } from 'react'
import './Checkout.css'

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputIsValid, setFormInputIsValid] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();

    const handleConfirm = (e) => {
        e.preventDefault();

        const enterName = nameRef.current.value;
        const enterStreet = streetRef.current.value;
        const enterPostalCode = postalCodeRef.current.value;
        const enterCity = cityRef.current.value;

        const enterNameIsvalid = !isEmpty(enterName);
        const enterStreetIsvalid = !isEmpty(enterStreet);
        const enterPostalCodeIsvalid = !isEmpty(enterPostalCode);
        const enterCityIsvalid = isFiveChars(enterCity);

        setFormInputIsValid({
            name: enterNameIsvalid,
            street: enterStreetIsvalid,
            postalCode: enterPostalCodeIsvalid,
            city: enterCityIsvalid,
        });

        const formIsValid = enterNameIsvalid && enterStreetIsvalid && enterPostalCodeIsvalid && enterCityIsvalid;

        if (!formIsValid) {
            return
        }

        props.onConfirm({
            name: enterName,
            street: enterStreet,
            postalCode: enterPostalCode,
            city: enterCity,
        });
    }

    return (
        <form className='checkout_form' onSubmit={handleConfirm}>
            <div className='control'>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formInputIsValid.name && <p className='error'>Please enter a valid name</p>}
            </div>
            <div className='control'>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!formInputIsValid.street && <p className='error'>Please enter a valid street</p>}
            </div>
            <div className='control'>
                <label htmlFor='code'>Postal Code</label>
                <input type='text' id='code' ref={postalCodeRef} />
                {!formInputIsValid.postalCode && <p className='error'>Please enter a valid postal code (5 character)</p>}
            </div>
            <div className='control'>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} />
                {!formInputIsValid.city && <p className='error'>Please enter a valid city</p>}
            </div>
            <div className='checkout_actions'>
                <button onClick={props.onCancle}>Cancle</button>
                <button type='submit' className='submit'>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout