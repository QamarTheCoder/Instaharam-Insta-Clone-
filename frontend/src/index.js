import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import Navbar from './dashboard/Navbar';
import Feed from './dashboard/HomePage/Feed';
import MainLayout from './dashboard/MainLayout';
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import ExplorePage from './dashboard/Explore/ExplorePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>

            <Route path='/' element={
                <MainLayout>
                <Feed/>
                </MainLayout>} />
            
             <Route path='/explore' element={
                <MainLayout>
                <ExplorePage/>
                </MainLayout>} />

            
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
        </Routes>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
