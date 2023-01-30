import { Modalstatestory } from '@/atoms/Modalstatestory'
import { Dialog, Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import send from '@/assets/send.png'
import { doc } from 'firebase/firestore'
import { onSnapshot , query ,orderBy} from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { db, storage } from '@/Firebase'
import {instagram} from '@/assets/instagram.png'
import Image from 'next/image'
import profile from '../assets/profile.jpg'
import { addDoc, collection,serverTimestamp, updateDoc } from 'firebase/firestore'
import { signIn,signOut,useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { Modalstatechat } from '@/atoms/Modalstatechat'
//import { useRef } from 'react'
export default function MyModalchat() {
  const {data:session}=useSession();
  let [isOpen, setIsOpen] = useRecoilState(Modalstatechat)
const captionRef=useRef(null); 
const imageRef=useRef(null);
const [image, setimage] = useState(null);
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
 
function closeModal() {
  setIsOpen(false)
}

function openModal() {
  setIsOpen(true)
}
const [loading, setloading] = useState(false)

return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className='flex justify-between'>
                <Dialog.Panel className=" flex flex-col items-center justify-between w-full max-w-md transform overflow-hidden rounded-2xl bg-[grey] p-6 text-left align-middle shadow-xl h-[40rem] w-auto transition-all">
                  <Dialog.Title
                     as="h3"
                    className="text-lg font-serif leading-6 text-[black] mt-[5px]"
                  >
                  Chat-Box
                  </Dialog.Title>
                  <div className=' w-full h-[30rem] scrollbar-thin scrollbar-thumb-[black]'>
                  {Comments.map((chat)=>{
return <div key={chat.id} className="flex items-center justify-between mt-5 h-[rem]">
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
                  <div className="flex gap-1 items-center">
                    <div className="mt-[14px]">
                    <img src={session?.user?.image} alt="" className='sm:w-8 sm:h-8 sm:rounded-full
                    rounded-full ml-[-6px] w-[7.8rem] h-[2rem]'/>
                    </div>
                  <div className="flex md-2 mt-4 h-[2rem]">
                  <input type='text' className="text-md text-[black] outline-0 rounded-[4px] " placeholder='Chat....' value={Comment}
        onChange={(e)=>setComment(e.target.value)} />
                <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-3 py-[0.1rem]  text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-[-24px] mt-[4px]"
                      onClick={sendcomment}
                    >
                   <Image priority="true"  alt="" src={send} className="sm:h-[1.2rem] sm:w-[1.2rem] sm:mt-[1px]  h-[1.1rem]"/>
                    </button>
                  </div>
                  <div className='mr-4'></div>
                  </div>
                </Dialog.Panel>
                <div className='mt-[2px]' onClick={closeModal}>
                <button className='w-[1.3rem] bg-black text-red-400 font-semibold'>X</button>
                </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}