const processReceipt = async (imgURL: string) => {
  return await fetch(`http://localhost:3000/api/test`, {
    method: "POST",
    body: JSON.stringify(imgURL),
    cache: "no-store",
  });
};

export default processReceipt;
