import { Modalstatedispstory } from '@/atoms/Modalstatedispstory'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { doc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { db, storage } from '@/Firebase'
import {instagram} from '@/assets/instagram.png'
import { onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import profile from '../assets/profile.jpg'
import { addDoc,query,orderBy,collection,serverTimestamp, updateDoc } from 'firebase/firestore'
import { signIn,signOut,useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import Moment from 'react-moment'
//import { useRef } from 'react'
export default function MyModaldispstory() {
  const {data:session}=useSession();
  let [isOpen, setIsOpen] = useRecoilState(Modalstatedispstory)
const captionRef=useRef(null); 
const imageRef=useRef(null);
const [image, setimage] = useState(null);
 
function closeModal() {
  setIsOpen(false)
}

function openModal() {
  setIsOpen(true)
}
const [stories, setstories] = useState([])
const [loading, setloading] = useState(false)
useEffect(() => {
    const unsubscibe=onSnapshot(query(collection(db,'story'),orderBy('timestamp','desc')),(snapshot)=>{
      setstories(snapshot.docs);
    });
    return()=>{
      unsubscibe();
    };
    }, [db])
//create data post and add it to firebase collection
{/*const uploadpost=async()=>{
  setloading(true);
const docRef=await addDoc(collection(db,'story'),{
profileimg:session?.user?.image,
  username:session?.user?.name,
  timestamp:serverTimestamp(),
});
//fetch for image
const imagePath=ref(storage,`story/${docRef.id}/image`
)
//upload image to that address
//then with snapshot declares the download url
await uploadString(imagePath,image,'data_url').then(async(snapshot)=>{
  const downloadUrl=await getDownloadURL(imagePath);
  await updateDoc(doc(db,'story',docRef.id),{image:downloadUrl,   
  })
})
setloading(false);
};
//add image to state (functionality)
const addtostate=(e)=>{
const reader=new FileReader();
if(e.target.files[0]){
  reader.readAsDataURL(e.target.files[0]);
}reader.onload=(readerEvent)=>{
setimage(readerEvent.target.result);
}
}*/}

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

          <div className="fixed inset-0 overflow-auto">
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
                <Dialog.Panel className=" flex flex-col items-center justify-between transform overflow-hidden rounded-2xl bg-[grey] p-6 text-left align-middle shadow-xl transition-all h-[41rem] ">
                 
                    <div className=" 
                     gap-8 scrollbar-thin scrollbar-thumb-[black]
                    sm:gap-8  sm:scrollbar-thin scrollbar-thumb-[black]">
                {  
                stories.map((store)=>{
              return <div key={store.id} className='pt-4 pd-4 w-auto h-auto'>  
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-[black] mt-[-8px]"
                  >
                    <div className="flex gap-2 items-center pl-[-2px]">
                        <img src={store.data().profileimg} alt="" className='rounded-full w-[3rem] h-[3rem] mt-3'/>
                        <div>
                        <p className='text-[16px]'>{store.data().username}</p>
                        <p className='text-[12px]'><Moment fromNow>{store.data().timestamp?.toDate()}</Moment></p>
                        </div> 
                    </div>
                  </Dialog.Title>
                  <div className="items-center hover:scale-95 w-auto h-auto duration-500 mt-[8px]" >
                   <img src={(store.data().image)} className="w-full h-full" alt=''/>       
                  </div>
                  <div className="mt-[1rem] text-center ">
                    <p className='text-[20px] font-semibold'>{store.data().caption}</p>
                  </div>
                  </div>
})}
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