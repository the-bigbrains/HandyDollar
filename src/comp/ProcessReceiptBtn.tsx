"use client";

import { categories } from "@/lib/categories";
import processReceipt from "@/lib/processReceipt";
import { supabaseClient } from "@/lib/supabaseClient";

export default function Page() {
  const imgURL =
    "https://qph.cf2.quoracdn.net/main-qimg-5a0fda721e2f66b6042bde9a10e93d83-lq";

  const getUser = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    return user;
  };

  return (
    <button
      className=" text-black"
      onClick={async () => {
        const user = await getUser();
        if (!user) return;
        const temp = await processReceipt(imgURL, user.id);
        const result = await temp.json();
        console.log(result);
        console.log("ANWER:", categories(result));
      }}
    >
      fetch
    </button>
  );
}
