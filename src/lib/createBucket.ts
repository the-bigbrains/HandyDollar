import { supabaseClient } from "./supabaseClient";

const createBucket = async () => {
  const { data, error } = await supabaseClient.storage.createBucket("images", {
    public: false,
    allowedMimeTypes: ["image/jpeg", "image/png"],
    fileSizeLimit: 1024,
  });
  console.log("create error:", error);

  return data;
};

export default createBucket;
