const processReceipt = async (imgURL: string, userId: string) => {
  return await fetch(`https://handy-dollar.vercel.app/api/test`, {
    method: "POST",
    body: JSON.stringify({ imgURL, userId }),
    cache: "no-store",
  });
};

export default processReceipt;
