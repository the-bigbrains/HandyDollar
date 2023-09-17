"use client";

export default async function Page() {
  const imgURL =
    "https://qph.cf2.quoracdn.net/main-qimg-5a0fda721e2f66b6042bde9a10e93d83-lq";

  const test = async () => {
    await fetch(`http://localhost:3000/api/test`, {
      method: "POST",
      body: JSON.stringify(imgURL),
      cache: "no-store",
    });
  };

  return (
    <button className="bg-white" onClick={test}>
      fetch
    </button>
  );
}
