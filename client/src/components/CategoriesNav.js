import React, { useEffect, useState } from 'react'

export default function CategoriesNav() {

    const [recipesCategories, setRecipesCategories] = useState([]);

    const getRecipesCategories = () => {
        fetch("http://localhost:1000/recipes/categories")
            .then(data => data.json())
            .then(res => {
                console.log(res);
                setRecipesCategories(res);
            })
    }

    useEffect(() => {
        getRecipesCategories();
    }, []);

    return (
        <div className='categories-nav-comp'>
            
        </div>
    )
}
