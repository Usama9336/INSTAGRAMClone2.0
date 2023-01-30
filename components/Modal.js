import { Modalstate } from '@/atoms/Modalstate'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import images from '@/assets/images.png'
import images1 from '@/assets/images1.png'
import { doc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { db, storage } from '@/Firebase'
import Image from 'next/image'
import profile from '../assets/profile.jpg'
import { addDoc, collection,serverTimestamp, updateDoc } from 'firebase/firestore'
import { signIn,signOut,useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
//import { useRef } from 'react'
export default function MyModal() {
  const {data:session}=useSession();
  let [isOpen, setIsOpen] = useRecoilState(Modalstate)
const captionRef=useRef(null); 
const imageRef=useRef(null);
const [image, setimage] = useState(null);
 
function closeModal() {
  setIsOpen(false)
  setimage(images.src)
}

function openModal() {
  setIsOpen(true)
}
const [loading, setloading] = useState(false)
//create data post and add it to firebase collection
const uploadpost=async()=>{
  setloading(true);
const docRef=await addDoc(collection(db,'posts'),{
profileimg:session?.user?.image,
  username:session?.user?.name,
 caption:captionRef.current.value,
  timestamp:serverTimestamp(),
});
//fetch for image
const imagePath=ref(storage,`posts/${docRef.id}/image`
)
//upload image to that address
//then with snapshot declares the download url
await uploadString(imagePath,image,'data_url').then(async(snapshot)=>{
  const downloadUrl=await getDownloadURL(imagePath);
  await updateDoc(doc(db,'posts',docRef.id),{image:downloadUrl,   
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
}

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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className=" flex flex-col items-center justify-between w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 m-4 mt-[-8px]"
                  >
                    Create New Post
                  </Dialog.Title>
                  <div className="items-center hover:scale-95 w-auto h-auto duration-500" onClick={()=>imageRef.current.click()}>
                {    <img src={(image?image:images.src)} className='w-auto h-auto'/>
}           
                    <input type="file" className='hidden' ref={imageRef} onChange={addtostate}/>
                  </div>
                  <div className="pl-[23px] md-2 mt-4">
                    <input className="text-md text-[black] outline-0 " placeholder='Please enter a caption' ref={captionRef} />
                  </div>

                  <div className="mt-4" onClick={closeModal}>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#0095f6] px-4 py-2 text-sm font-medium text-white hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={uploadpost}
                    >
                     Upload Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}