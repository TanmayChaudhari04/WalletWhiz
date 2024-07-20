import React from 'react'
import { useState } from 'react';
import Header from '../components/Header'
import SignIn from './SignIn'
import '../index.css'
import mainImg from '../assets/main-img1.png'

function Home() {
  return (
    <div className='w-full h-full'>
        <Header></Header>
        <div className='lg:px-5 px-4 lg:py-0 py-10 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between lg:gap-28 items-center'>
            <div className='h-full lg:py-24 flex flex-col justify-center lg:items-start items-center'>
                <div className='text-black ml-14 flex'>
                    <h2 className='text-black text-8xl font-medium'>Welcome to <span className='bg-gradient-to-tl from-slate-800 via-blue-600 to-zinc-400 bg-clip-text text-transparent'>Wallet Whiz!</span></h2>
                </div>
                <div className='ml-16 text-3xl'>
                    <p className='main-page font-serif mt-12'>Take Control of Your Finances with Ease</p>
                </div>
                <div className='main-page text-2xl font-serif mt-20 ml-16 text-sky-900'>
                    <p>
                        Managing your personal finances has never been easier. Wallet Whiz is designed to help you track your income, expenses, and budgets all in one place.
                    </p>
                </div>
            </div>
            
            <img src={mainImg} width={600} height={600}></img>
            
        </div>
    </div>
  )
}

export default Home