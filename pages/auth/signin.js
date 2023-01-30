import Header from "@/components/Header"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import instagram from '@/assets/instagram.png'

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <div className="flex flex-col items-center mt-12">
            <div className="w-[17rem] h-[5rem]">
              <img  alt="" src={instagram.src}/>
            </div>
            <div className="rounded-full bg-blue-500 p-2">
          <button onClick={() => signIn(provider.id,{callbackUrl:"/"})}>
            Sign in with {provider.name}
          </button>
          </div>
          </div>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}