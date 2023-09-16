"use client";
import { supabase } from "@/types/supabase";

const imgURL =
  "https://qph.cf2.quoracdn.net/main-qimg-5a0fda721e2f66b6042bde9a10e93d83-lq";

export default function Page() {
  const findImg = async (imgURL: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    console.log("user id", user.id);
    const { data, error } = await supabase
      .from("profiles")
      .select("img_url")
      .eq("id", user.id)
      .single();

    if (!data || !data.img_url) return;

    console.log(data.img_url.find((url) => url === imgURL));
  };

  const addURL = async (url: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    console.log("user id", user.id);

    const { data } = await supabase
      .from("profiles")
      .select("img_url")
      .eq("id", user.id)
      .single();

    console.log("checking data");
    console.log(data);

    const { error } = await supabase
      .from("profiles")
      .update({ img_url: data?.img_url ? [...data.img_url, url] : [url] })
      .eq("id", user.id);
  };
  // const res = await computerVision(imgURL);

  // const something = await gpt(res);

  // console.log(something);

  return (
    <div>
      <button className="bg-white" onClick={() => addURL(imgURL)}>
        {" "}
        add url
      </button>
      <button className="bg-white" onClick={() => findImg(imgURL)}>
        Find
      </button>
    </div>
  );
}
