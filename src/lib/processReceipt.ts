const processReceipt = async (imgURL: string, userId: string) => {
  return await fetch(`http://localhost:3000/api/test`, {
    method: "POST",
    body: JSON.stringify({ imgURL, userId }),
    cache: "no-store",
  });
};

export default processReceipt;
