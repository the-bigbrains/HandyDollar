import AuthForm from './auth-form'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <div className="col-6">
        <h1 className="header">Welcome to SandyDollar!</h1>
        <p className="">
          Please Log in to get started
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}