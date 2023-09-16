import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import AuthForm from '../components/auth-form'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="col-6">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p className="">
          Experience our Auth and Storage through a simple profile management example. Create a user
          profile and upload an avatar image. Fast, simple, secure.
        </p>
      </div>
      <div className="col-6 auth-widget w-48 h-12">
        <AuthForm />
      </div>
    </div>
  )
}
