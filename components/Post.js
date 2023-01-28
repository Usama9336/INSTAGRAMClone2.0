import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import dots from '../assets/dots';
import { signIn,signOut,useSession } from 'next-auth/react'
import { db } from '@/Firebase';
import { addDoc,collection,deleteDoc,doc,onSnapshot,orderBy,query,serverTimestamp, setDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import Moment from 'react-moment';
import {profile} from '../assets/profile.jpg'
import send from '@/assets/send.png'
import heart from '@/assets/heart.png'
import heart1 from '@/assets/heart1.png'
import bookmark from '@/assets/bookmark.png'
import video from '@/assets/video.png'
export default function Post({key,id,username,profilepic,postphoto,caption,timestamp}){
  const comments=[{
           username:"jon div",
           comment:"this is comment"
  },
  {
    username:"hon div",
    comment:"this is comment"
},
]
const {data:session}=useSession();
console.log(session);
{/*const captionRef=useRef(null); 
const uploadpost=async()=>{
  const docRef=await addDoc(collection(db,'posts'),{
    profileimg:session?.user?.image,
    username:session?.user?.name,
   caption:captionRef.current.value,
    timestamp:serverTimestamp(),
  })
  }
  const [posts, setposts] = useState([]);
  console.log(posts);
useEffect(() => {
  const unsubscibe=onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot)=>{
    setposts(snapshot.docs);
  });
  return()=>{
    unsubscibe();
  };
}, [db]); */}

const [liked, setliked] = useState(false)
const [liked1, setliked1] = useState(false)
const [likes,setlikes]=useState([]);
const [Comment,setComment]=useState("");
const [Comments,setComments]=useState([]);
//when like update in db then here also
useEffect(()=>
onSnapshot(collection(db,'posts',id,'likes'),
(snapshot)=>setlikes(snapshot.docs)
),
[db,id]
)
//checking user liked
useEffect(
()=>setliked(  likes.findIndex((like)=>like.id===session?.user?.uid)!==-1
),
[likes]
);

//click to add like to fb when doubleclick
//to delete like
const likepost=async()=>{
if(liked){
  await deleteDoc(doc(db,'posts',id,'likes',session?.user?.uid));
}
else
{
  await setDoc(doc(db,'posts',id,'likes',session?.user?.uid),{
username:session?.user?.name,
  });
}
}

//displaying comment
useEffect(
  ()=>
onSnapshot(query(collection(db,'posts',id,'comments'),
  orderBy('timestamp','desc')
  ),
  (snapshot)=>setComments(snapshot.docs)
  ),
  [(db,id)]
);

//sent comment to db
const sendcomment=async(e)=>{
e.preventDefault()
const commenttosend=Comment;
setComment("");
await addDoc(collection(db,'posts',id,'comments'),{
  Comment:commenttosend,
  username:session?.user?.name,
  image:session?.user?.image,
  timestamp:serverTimestamp(),
});
};

  return (
    <div>
    <div className='border rounded-lg my-3'>
    <div className='flex items-center p-3'>
     {/*header*/}
<div className="flex items-center w-full justify-between">
  <div className="flex">
<div className="h-8 w-10 mr-3">
<img src={profilepic} alt="" className='rounded-full w-8 h-7'/>
</div>
<div className=" font-semibold text-sm ml-[-8px]">
  <p>{username}</p>
  <p>Original Audio</p>
</div>
</div>
<div className="w-6 h-6">
  <Image src={send}/>
</div>
</div>
</div>
     {/*photo*/}
     <div className="w-full h-full">
      <img src={postphoto} alt="" className='w-full h-full'/>
     </div>
     {/*buttons*/}
      <div className="w-full">
     <div className="m-3 w-full flex justify-between">
      <div className="flex space-x-4 ">
      <div className="btn" onClick={likepost}>
        <Image src={(liked?heart1:
          heart)}/>
      </div>
      <div className="btn">
        <Image src={video}/>
      </div>
      <div className="btn">
        <Image src={send}/>
      </div>
      </div>
       <div className="btn mr-[15px]">
        <Image src={bookmark}/>
      </div>
      </div>

          <div className="m-2 customfont">
            <p>{`${likes.length} likes`}</p>
          </div>
          </div>
     {/*caption*/}
     <div className="flex items-center ml-2 mt-[-1px]">
      <p className='customfont mr-2 whitespace-nowrap'>{username}</p>
      <p className='truncate'>{caption}</p>
     </div>
     {/*view all comments*/}
     <p className='text-sm m-2 text-[grey]'>{`${Comments.length} comments`}</p>
     {/*comments*/}
     <div className="">
{
  Comments.map((comment)=>{
       return <div className="max-w-24
       overflow-y-auto flex justify-between ml-2">
          <div className="flex items-center truncate">
            <p className='customfont mr-2'>{comment.data().username}</p>
            <p className='truncate mr-2'>{comment.data().Comment}</p>
          </div>
          <div className="h-3 w-3 mt-2 shrink-0" onclick={()=>setliked1(!liked1)}>
          <Image src={(liked1?heart1:
          heart)}/>
          </div>
        </div>
  })
}

     </div>
     {/*timestamp*/}
     <p className='text-sm text-[grey] m-2'>
      <Moment fromNow>{timestamp?.toDate()}</Moment>
     </p>
    {/*border*/}
    <div className="border-t my-3">
    </div>
     {/*input*/}
     <div className="flex justify-between m-2">
      <div className="flex">
        <div className="btn mr-4">
          <img src={session?.user?.image}/>
        </div>
        <input className='outline-0' type="text" placeholder='Add a comment...' value={Comment}
        onChange={(e)=>setComment(e.target.value)} />
      </div>
      <button className='font-bold text-sm text-[#0095f6]' onClick={sendcomment} >
        <Image src={send} className="w-4 h-4"/>
      </button>
     </div>
    </div>
    </div>
  )
}
