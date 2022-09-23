import React from 'react';
import mealsImage from '../../assets/images/food.jpg';
import './Header.css';
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {
    return (
        <>
            <header className='header'>
                <h1>ReactMeals</h1>
                <HeaderCartButton onShowCart={props.onHandleShowCart} />
            </header>
            <div className='main-image'>
                <img src={mealsImage} alt='FoodImage' />
            </div>
        </>
    )
}

export default Header