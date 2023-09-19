"use client";
import { supabaseClient } from "@/lib/supabaseClient";

export default function Home() {
  async function signInWithGitHub() {
    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        "http://localhost:3000/";
      // Make sure to include `https://` when not localhost.
      url = url.includes("http") ? url : `https://${url}`;
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
      return url + "dashboard";
    };

    console.log("geturl", getURL());

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getURL(),
      },
    });

    console.log("data", data);
  }

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
        <button
          className="bg-white"
          onClick={async () => {
            await signInWithGitHub();
          }}
        >
          sign in
        </button>
      </div>
    </div>
  );
}
