"use client";

import processReceipt from "@/lib/processReceipt";

export default function Page() {
  const imgURL =
    "https://qph.cf2.quoracdn.net/main-qimg-5a0fda721e2f66b6042bde9a10e93d83-lq";

  return (
    <button
      className="bg-white text-white"
      onClick={() => processReceipt(imgURL)}
    >
      fetch
    </button>
  );
}
