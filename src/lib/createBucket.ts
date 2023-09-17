import { supabaseServer } from "./supabase";

const createBucket = async () => {
  const { data, error } = await supabaseServer.storage.createBucket("images", {
    public: false,
    allowedMimeTypes: ["image/png"],
    fileSizeLimit: 1024,
  });
  return data;
};

export default createBucket;
