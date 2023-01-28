import profile from '../assets/profile.jpg';
import React from 'react'
import Post from './Post';
import { useState,useEffect} from 'react';
import { db } from '@/Firebase';
import { addDoc,collection,onSnapshot,orderBy,query,serverTimestamp } from 'firebase/firestore';
const Posts = () => {
    const post=[{
        id:"123",
        username:"Amasu",
        profilepic:profile,
        postphoto:profile,
        caption:"hellow caption ",
    },
    {
        id:"223",
        username:"umasu",
        profilepic:profile,
        postphoto:profile,
        caption:"hellow caption",
    },
];
//console.log("id=");  console.log(posts.id);
const [posts, setposts] = useState([]);
console.log(posts);
useEffect(() => {
const unsubscibe=onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot)=>{
  setposts(snapshot.docs);
});
return()=>{
  unsubscibe();
};
}, [db]);
  return (
    <div className='pt-1 mx-1'>
        {
            posts.map((post)=>{
                return  <Post
                key={post.id}
                id={post.id}
                username={post.data().username}
                profilepic={post.data().profileimg}
                postphoto={post.data().image}
                caption={post.data().caption}
             timestamp={post.data().timestamp}
                />
        })
        }
        
        </div>
  )
}
export default Posts;