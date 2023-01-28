import { faker } from '@faker-js/faker'
import React from 'react'
import { useState,useEffect } from 'react'
faker
import { addDoc, collection,query,orderBy} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { db } from '@/Firebase'
import { useSession } from 'next-auth/react';
import { onSnapshot } from 'firebase/firestore'
import { IoIosSend } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
export default function Suggestions() {
  const {data:session}=useSession();
    const [suggestion, setsuggestion] = useState([])
    useEffect(() => {
      setsuggestion([...Array(5)].map(()=>({
       userid:faker.datatype.uuid(),
       username:faker.internet.userName(),
       avatar:faker.image.avatar(),
      }))
      );
    },[]);
  console.log(suggestion)

  const [Comment,setComment]=useState("");
  const [Comments,setComments]=useState([]);

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

//sent comment to db
const sendcomment=async(e)=>{
e.preventDefault()
const commenttosend=Comment;
setComment("");
await addDoc(collection(db,'Chats'),{
  Comment:commenttosend,
  username:session?.user?.name,
  image:session?.user?.image,
  timestamp:serverTimestamp(),
});
};

    return (
    <div className='mt-4'>
      {/*<div className="flex items-center justify-between ">
       <p className='text-sm font-semibold text-[grey] mt-1'>Suggestion for you</p>
        <button className='font-semibold text-sm'>See all</button>
      </div>*/}
      <div className="h-[30rem] scrollbar-thin scrollbar-thumb-[grey]">
      {Comments.map((chat)=>{
return <div className="flex items-center justify-between mt-5 h-[rem]">
<div className="flex items-center">
<div className="w-8 h-8">
    <img src={chat.data().image} alt="" className='rounded-full'/>
</div>
<div className="ml-4">
    <p className='font-semibold text-sm'>{chat.data().username}</p>
    <p className='text-grey text-sm'>{chat.data().Comment}</p>
</div>
</div>
</div>
})}
</div>
<div className='flex mt-4 gap-4'>
  <img src={session?.user?.image} alt="" className='w-[2rem] h-[2rem] ' />
<input className='outline-0' type="text" placeholder='chat...' value={Comment}
        onChange={(e)=>setComment(e.target.value)} />
<button className='w-[10px] h-[10px] font-semibold text-[#0095f6]' onClick={sendcomment}>send</button>
</div>
<div className="mt-[2.5rem]">
  <div className="flex text-sm text-[grey] gap-2">
  <p>About</p>
  <p>.</p>
  <p>Help</p>
  <p>.</p>
  <p>Privacy</p>
  <p>.</p>
  <p>Terms</p>
  <p>.</p>
  <p>Location</p>
  <p>.</p>
  <p>Security</p>
  </div>
    <p className="mt-4 text-sm text-[grey]">Copyright 2022 Instagram</p>
</div>
    </div>
  )
}
