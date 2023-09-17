import AuthForm from "./auth-form";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center">
      <div className="col-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-gray-500 pb-3">
          Welcome to SandyDollar!
        </h1>
        <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-200 mx-auto">
          Please Log in to get started
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}
