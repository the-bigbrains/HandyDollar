import createBucket from "./createBucket";
import { supabaseServer } from "./supabase";

const upload = async (event: React.FormEvent<HTMLInputElement>) => {
  const { data: bucketList } = await supabaseServer.storage.listBuckets();

  if (!bucketList || !bucketList.length) {
    await createBucket();
  }

  const image = event.target.files[0];

  const { data: pathData } = await supabaseServer.storage
    .from("images")
    .upload("public/avatar1.png", image, {
      cacheControl: "3600",
      upsert: false,
    });

  return pathData;
};

export default upload;
