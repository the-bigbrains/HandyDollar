import { supabaseClient } from "./supabaseClient";

const upload = async (image: File) => {
  const { data: kek } = await supabaseClient.auth.getUser();
  console.log("id", kek.user?.id);

  if (!image) return;

  const { data: pathData, error } = await supabaseClient.storage
    .from("receipts")
    .upload(`${image.name}`, image, {
      cacheControl: "3600",
      upsert: false,
    });

  const { data } = supabaseClient.storage
    .from("receipts")
    .getPublicUrl(`${image.name}`);
  return data.publicUrl;
};

export default upload;
