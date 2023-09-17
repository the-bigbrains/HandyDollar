const processReceipt = async (imgURL: string, userId: string) => {
  return await fetch(`/api/test`, {
    method: "POST",
    body: JSON.stringify({ imgURL, userId }),
    cache: "no-store",
  });
};

export default processReceipt;
