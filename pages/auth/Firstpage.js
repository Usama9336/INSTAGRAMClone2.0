import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useSession } from 'next-auth/react'
import {Display} from './Display'
import Image from 'next/image'
import google from '@/assets/google.gif'
import instagram from '@/assets/instagram.png'
import { useRouter } from 'next/router'
export default function Firstpage() {
  const router=useRouter()
  const {data:session}=useSession();
  return (
    <div className="pt-[3rem]  h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center">
     
    <div className="flex flex-col items-center mt-[-1rem] sm:flex sm:flex-col sm:items-center sm:mt-[3rem]">
     <div className="text-center shadow-2xl rounded-[6px] p-[1.5rem] mt-[-2.8rem] duration-500">
      <div className="w-[19rem] h-[6rem]">
        <img src={session?.user?.image} className="mt-[1rem] hover:scale-[90%] duration-500 rounded-full mx-[6.5rem]" alt=""/>
      </div>
      <div className='flex text-lg font-semibold gap-2 items-center mx-[4.5rem]'>
      <p>Hey !</p>
       <p>{session?.user?.name}</p>
      </div>
      <div className=" font-semibold font-style:italic">
        <p>This is My first Web Application
          I Have Made 
        </p>
        <p>An Instagram Clone Here you can Upload </p>
        <p>Posts and Story,You can also Like and </p>
        <p>comment Posts and I Have also Made a Chat</p>
        <p>Box Where you can Chat with anyone who </p>
        <p>have Signed in My project and Is Present at </p>
        <p>same Time. I Have Used Same design As </p>
        <p>Instagram Web But in Some Components i </p>
        <p>Have not Made Exact Same as Instagram</p>
        <p>Please Make sure you have given a</p>
        <p>Feedback Of This Project in Comments</p>
        <p>or Chat-Box.</p>
        <p>You can see My Project By Clicking Gets </p>
        <p>Started</p>
        <div className=''>
      <div className="sm:gap-5 gap-5 sm:font-semibold  font-semibold sm:text-lg text-lg sm:rounded-full rounded-full sm:text-center text-center sm:bg-[white] bg-[white] sm:p-2 p-2 sm:mt-[0.5rem] hover:bg-blue duration-500 sm:hover:bg-blue-500 scale-[70%] sm:scale-[90%] sm:duration-500 sm:cursor-pointer"onClick={()=>router.push('/auth/Display')} >
    <p>Gets Started</p>
    </div>
    <p className='mt-[0.4rem] font-mono'>Hope You Like It!!!</p> 
    </div>
    </div>
    </div>
    </div>
  </div>
  )
}
