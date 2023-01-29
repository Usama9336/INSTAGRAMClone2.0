import React from 'react'
import Image from 'next/image'
import instagram from '@/assets/instagram.png'
import profile from 'assets/profile.jpg'
import { Modalstate } from '@/atoms/Modalstate'
import { useRecoilState } from 'recoil'
import {TfiSearch} from "react-icons/tfi"
import {GrHomeRounded} from "react-icons/gr"
import {FiSend} from "react-icons/fi"
import { useState,useEffect } from 'react'
import {CgAddR, CgInstagram, CgProfile} from "react-icons/cg"
import {IoIosArrowDown} from "react-icons/io"
import { signIn,signOut,useSession } from 'next-auth/react'
import {orderBy,onSnapshot,query,collection } from 'firebase/firestore'
import { db } from '@/Firebase'
import { Modalstatestory } from '@/atoms/Modalstatestory'
import { useRouter } from "next/router"
import { Modalstatechat } from '@/atoms/Modalstatechat'
import homeone from '@/assets/home.png'
import send from '@/assets/send.png'
import heart from '@/assets/heart.png'
import video from '@/assets/video.png'
import heart1 from '@/assets/heart1.png'
import bookmark from '@/assets/bookmark.png'

export default function Header() {
  const {data:session}=useSession();
  const [open, setopen] = useRecoilState(Modalstate)
  const [openchat, setopenchat] = useRecoilState(Modalstatechat)
  const [Comment,setComment]=useState("");
  const [Comments,setComments]=useState([]);
const router=useRouter()
//displaying comment
useEffect(
  ()=>
onSnapshot(query(collection(db,'Chats'),
  orderBy('timestamp','desc')
  ),
  (snapshot)=>setComments(snapshot.docs)
  ),
  [(db)]
);
  const len=Comments.length;

    return (
    <div className='border-b shadow-sm bg-white sticky top-0 z-10'>
      <div className='flex justify-between items-center h-18 px-2 sm:max-w-5xl  mx-auto'>
        {/*left*/}
        <div className='flex'>
            <div className='p-2 w-[10rem] sm:w-[13rem] sm:p-2 sm:h-full sm:flex'>
        <Image alt="" src={instagram}/>
            </div>
        </div>
          {/*middle*/}
          <div className='hidden w-[15.2rem]  sm:flex relative mx-2'>
              <div className='absolute pl-[4px] w-full h-full flex items-center '>
              <TfiSearch className=' w-[1.1rem] h-[3rem]'/>
              </div>
              <input type="text" placeholder='Search' className='h-9 w-full rounded-md bg-[#efefef] pl-7 outline-0 border-[1px]'/>
          </div>
            {/*right*/}
            <div className='flex ml-[-4px] space-x-4 sm:flex sm:space-x-5'>
                 <div className='hidden sm:flex'>
                <Image alt="" src={homeone} className="w-[1.6rem] h-[1.6rem] cursor-pointer hover:scale-[80%] duration-500"/>
                                 </div>
                 <div className='btn flex relative' onClick={()=>setopenchat(!openchat)}>
                 <Image alt="" src={send} className=" hover:scale-[80%] duration-500"/>
                  <div className='absolute flex top-2 left-3.5 items-center justify-center bg-red-500 text-[white] rounded-full w-4 h-4 text-xs'>{len}</div>
                 </div>
                 <div className='cursor-pointer flex' onClick={()=>setopen(!open)}>
                  <CgAddR className='w-[1.7rem] h-[1.8rem]  hover:scale-[80%] duration-500'/>
                 </div>
                 <div className='btn mt-[3px] hidden sm:flex'>
                  <Image alt="" src={video} className=" hover:scale-[80%] duration-500"/>
                 </div>
                 <div className='btn mt-[3px] hidden sm:flex'>
                  <Image alt="" src={heart} className=" hover:scale-[80%] duration-500"/>
                 </div>
                 <div className='flex'>
                  <div className='btn mr-2 mt-[3px] ml-[-7px]' onClick={signIn}>
                  <img src={session?.user?.image} alt="" className='rounded-full  hover:scale-[80%] duration-500'/>
                  </div>
                  <div className='cursor-pointer text-[#0095f6] font-semibold whitespace-nowrap  hover:scale-[80%] duration-500' onClick={()=>router.push("/")} >
              
                    Sign out
                
                  </div>
                 </div>
            </div>
        </div>
     </div>
  )
}
