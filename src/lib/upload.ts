import { supabaseClient } from "./supabaseClient";

const upload = async (event: React.FormEvent<HTMLInputElement>) => {
  const { data: kek } = await supabaseClient.auth.getUser();
  console.log("id", kek.user?.id);

  // @ts-ignore
  const image = event.target.files[0];

  if (!image) return;

  const { data: pathData, error } = await supabaseClient.storage
    .from("receipts")
    .upload(`${image.name}.jpg`, image, {
      cacheControl: "3600",
      upsert: false,
    });

  const { data } = supabaseClient.storage
    .from("receipts")
    .getPublicUrl(`${image.name}.jpg`);
  return data.publicUrl;
};

export default upload;
