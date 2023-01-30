import React from 'react'
import profile from '../assets/profile.jpg'
import { signIn,signOut,useSession } from 'next-auth/react'
export default function Miniprofile() {
  const {data:session}=useSession();
  return (
    <div className="mt-4 ">
      <p className='font-serif text-lg ml-[7rem]'>CHAT-BOX</p>
    <div className='flex justify-between pt-4'>
       <div className="flex items-center">
        <div className="pt-2">
        <img src={session?.user?.image} alt="" className='rounded-full w-[2.8rem] h-[2.5rem]'/>
      </div>
      <p className='pl-3 text-sm font-semibold'>{session?.user?.name}</p>
       </div>
       <button className='text-sm font-semibold text-[#009f56]'>
        {(session ? "Signed In":"Signed Out")}
       </button>
    </div>
    </div>
  )
}