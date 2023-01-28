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
    <div className="pt-[0.1rem] h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center">
     
    <div className="flex flex-col items-center mt-[4rem]">
     <div className="text-center shadow-2xl rounded-[6px] p-[1.5rem] mt-[-2.8rem] duration-500">
      <div className="w-[19rem] h-[6rem]">
        <img src={session?.user?.image} className="mt-[1rem] hover:scale-[90%] duration-500 rounded-full mx-[6.5rem]" alt=""/>
      </div>
      <div className='flex text-lg font-semibold gap-2 items-center mx-[4.5rem]'>
      <p>Hey !</p>
       <p>{session?.user?.name}</p>
      </div>
      <div className="font-semibold font-style:italic">
        <p>This is My first Web Application
          I Have Made 
        </p>
        <p>An Instagram Clone Here you can Upload </p>
        <p>Posts and Story,Here you can also Like and </p>
        <p>comment Posts and I Have also Made a Chat</p>
        <p>Box Where you can Chat with anyone who </p>
        <p>have Signed in My project and Is Present at </p>
        <p>same Time. I Have Used Same designing </p>
        <p>As Instagram Web But Some Components i </p>
        <p>Haven't Made Exact Same as Instagram</p>
        <p>Please Make sure you have given a</p>
        <p>Feedback Of This Project in Comments</p>
        <p>Chat-Box.</p>
        <p>You can see My Project By Clicking Gets </p>
        <p>Started</p>
      </div>
      <div className="gap-5 font-semibold text-lg rounded-full text-center bg-[white] p-2 mt-[1.8rem] hover:bg-blue-500 duration-500 "onClick={()=>router.push('/auth/Display')} >
    <p>Gets Started</p>
    </div>
    <p className='mt-[1rem] font-mono'>Hope You Like It!!!</p>
    </div>
    </div>
  </div>
  )
}
