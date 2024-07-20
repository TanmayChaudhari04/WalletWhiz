import React, { useEffect } from 'react'
import { useState } from 'react';
import { LuWallet } from 'react-icons/lu'
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from '../assets/user.png';
import './style.css'

function Header() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user){
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logOutFunct()
  {
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged Out Successfully!");
        navigate("/");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    }
    catch(e){
      toast.error(e.message);
    }
  }

  return (
    <div className='navbar px-8 pt-4 pb-4 top-0 left-0 w-full flex justify-between items-cente'>
      <p className='text-black font-medium text-2xl m-0 flex'>
        <LuWallet className='mr-4 mt-2 ml-6'></LuWallet> <a href='/' className='mt-1'>Wallet Whiz</a>
      </p>
      <div className='flex items-center px-8'>
        {!user && (<p><button className='text-black bg-blue-400 rounded-full px-4 py-2 mr-3'><a href='/signup'>SignUp</a></button></p>)}
        {!user && (<p className='text-black ml-3 mr-3'><button><a href='/signin'>SignIn</a></button></p>)}    
        {user && (<div style={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
          <img src={user.photoURL ? user.photoURL : userImg} style={{width:"2rem", height:"2rem", borderRadius:"50%"}}></img>
          <p onClick={logOutFunct} className='text-black ml-3 opacity-50 hover:opacity-100'><button>LogOut</button></p>
        </div>)}
      </div>
    </div>
  )
}

export default Header