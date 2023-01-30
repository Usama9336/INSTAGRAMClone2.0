import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import Miniprofile from './Miniprofile'
import Suggestions from './Suggestions'
import { signIn,signOut,useSession } from 'next-auth/react'
export default function Feed() {
  const {data:session}=useSession();
  return (
    <div className='flex max-w-[760px] mx-auto lg:max-w-[780px] '>
        <section className='max-w-[494px] mx-auto w-[100vw]'>
             {/*stories*/}
              <Stories/>
              {/*post*/}
              <Posts/>
        </section>
        <section className='max-w-[320px] w-full hidden ml-[1.5rem] lg:block'>
 {/*miniprofile*/}
<Miniprofile/>
 {/*suggestions*/}
 <Suggestions/>
        </section>
    </div>
  )
}