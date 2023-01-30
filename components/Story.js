import React from 'react'
import { useRecoilState } from 'recoil'
import { Modalstatedispstory } from '@/atoms/Modalstatedispstory'
import { useSession } from 'next-auth/react'
import images1 from '@/assets/images1.png'
import Image from 'next/image'
//import { Link } from 'react-router-dom'
export default function Story({username,avatar,img}) {
  const [open, setopen] = useRecoilState(Modalstatedispstory)
 // const [pas,setpas]=useRecoilState(Modalstatedispstory)
  //const [pass, setpass] = useState(Modalstatedispstory)
  const {data:session}=useSession();
  return (
    <div className=''>
<img src={avatar} alt=""  onClick={()=>setopen(!open)} className="rounded-full border-[4px] border-red-500 scale-[80%] cursor-pointer hover:scale-[90%] duration-500" />
<p className='text-xs pl-1 mt-[-4px] font-semibold  w-[100px] truncate text-center'>{username}</p>
    </div>
  )
}
