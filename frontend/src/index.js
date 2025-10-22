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
import CreatePage from './dashboard/Create/CreatePage';
import UserProfile from './dashboard/Profile/UserProfile';
import Menu from './dashboard/Menu/Menu';
import FullPostView from './dashboard/HomePage/FullPostView';
import UploadPage from './dashboard/Create/UploadPage';
import ErrorElement from './Error/ErrorElement';
import ProfileSettings from './dashboard/Profile/ProfileSettings';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>

            <Route path='/' element={
                <ProtectedRoute>
                <MainLayout>
                <Feed/>
                </MainLayout>
                </ProtectedRoute>} />
            
             <Route path='/explore' element={
                <ProtectedRoute>

                <MainLayout>
                <ExplorePage/>
                </MainLayout>
            </ProtectedRoute>} />


            <Route path='/Upload' element={
                <ProtectedRoute>

                <MainLayout>
                <CreatePage/>
                </MainLayout>
                </ProtectedRoute>} />
            
              <Route path='/Profile' element={
                <ProtectedRoute>

                <MainLayout>
                <UserProfile/>
                </MainLayout>
                </ProtectedRoute>} />

            <Route path='/user/:username' element={
                <ProtectedRoute>

                <MainLayout>
                <UserProfile/>
            </MainLayout>
            </ProtectedRoute>} />

             <Route path='/user/settings' element={
                <ProtectedRoute>

                <MainLayout>
                <ProfileSettings/>
            </MainLayout>
            </ProtectedRoute>} />



            <Route path='/Menu' element={
                <ProtectedRoute>

                <MainLayout>
                <Menu/>
                </MainLayout>
                </ProtectedRoute>} />

            <Route path='/post/viewpost/:posturl' element={
                <ProtectedRoute>

                <MainLayout>
                <FullPostView/>
                </MainLayout>
                </ProtectedRoute>} />

                <Route path='/UploadPreview' element={
                <ProtectedRoute>
                <MainLayout>
                <UploadPage/>
                </MainLayout>
                </ProtectedRoute>} />
            
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />

            <Route path='/*' element={<ErrorElement/>} />
        </Routes>
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
