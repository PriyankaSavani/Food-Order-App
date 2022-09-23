import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import './AvailableMeals.css';
import MealItem from './MealItems/MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://practice-project-2d43c-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('There is something wrong');
            }

            const responseData = await response.json();

            const loadMeals = [];

            for (const key in responseData) {
                loadMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadMeals);
            setIsLoading(false);
        }

        fetchMeals().catch((error) => {
            setIsLoading(false)
            setError(error.message);
        });

    }, [])

    return (
        <section className='meals'>
            <Card>
                {isLoading ? (
                    <p className='loading'>Loading data...</p>
                ) : error ? (
                    <p className='error'>{error}</p> 
                ) : (
                    <ul>
                        {(meals || []).map((meal) => {
                            return (
                                <MealItem
                                    key={meal.id}
                                    id={meal.id}
                                    name={meal.name}
                                    description={meal.description}
                                    price={meal.price}
                                />
                            )
                        })}
                    </ul>
                )}

            </Card>
        </section>
    )
}

export default AvailableMeals