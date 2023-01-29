import React,{useState,useEffect} from 'react'
import {faker} from '@faker-js/faker'
import { useRecoilState } from 'recoil'
import { Modalstate } from '@/atoms/Modalstate'
import { useSession } from 'next-auth/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Story from './Story'
import { Modalstatestory } from '@/atoms/Modalstatestory'
import { db } from '@/Firebase'
import { collection, query,orderBy} from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'
import images1 from '@/assets/images1.png'
const Stories=()=> {
  const [stories, setstories] = useState([])
  const [open, setopen] = useRecoilState(Modalstatestory)
  const {data:session}=useSession();

 
  useEffect(() => {
  const unsubscibe=onSnapshot(query(collection(db,'story'),orderBy('timestamp','desc')),(snapshot)=>{
    setstories(snapshot.docs);
  });
  return()=>{
    unsubscibe();
  };
  }, [db])

  console.log(stories);
  return (
     <div className='flex mx-2 space-x-[-3px] bg-[white] border rounded-lg scrollbar-thin scrollbar-thumb-[grey] p-2'>
      <div className=''>
      <div className='flex'>
     <img src={session?.user?.image} alt="" className='rounded-full cursor-pointer hover:scale-[90%] duration-500 p-[1.5px] scale-[80%] border-[3px] ' onClick={()=>setopen(!open)}/>
     </div>
<p className='text-xs pl-1 mt-[-4px] font-semibold w-[100px] truncate text-center'>{session?.user?.name}</p>
</div>
        {
        stories.map((profile)=>{
            return <Story key={profile.id} username={profile.data().username} avatar={profile.data().profileimg} img={profile.data().image}/>
        })}
        
     </div>
    
  )
}

export default Stories;