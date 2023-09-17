"use client";

import processReceipt from "@/lib/processReceipt";
import { supabaseClient } from "@/lib/supabase";

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
      className="bg-white text-white"
      onClick={async () => {
        const user = await getUser();
        processReceipt(imgURL, user?.id || "");
      }}
    >
      fetch
    </button>
  );
}
