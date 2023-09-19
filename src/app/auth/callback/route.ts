import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const supabase = createRouteHandlerClient({ cookies });
  // const { searchParams } = new URL(req.url);
  // const code = searchParams.get("code");

  console.log("do you even");

  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";

    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url + "dashboard/";
  };

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: getURL(),
    },
  });

  console.log("dat url", data.url);
  if (!data.url) return;
  const redirectURL = new URL(data.url);

  return NextResponse.redirect(redirectURL);
  // if (code) {
  //   await supabase.auth.exchangeCodeForSession(code);
  // }

  // return NextResponse.redirect(new URL("/dashboard", req.url));
}
