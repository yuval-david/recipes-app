import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CategoriesNav from './CategoriesNav';
import Navbar from './Navbar';

export default function Home() {

    // const [recipes, setRecipes]
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        let loginStatus = localStorage.getItem("token");
        setIsLogged(loginStatus);
    }, []);

    return (
        <div className='home-component'>

            <Navbar />
            <CategoriesNav />
            <h1>Home</h1>





        </div>
    )
}
