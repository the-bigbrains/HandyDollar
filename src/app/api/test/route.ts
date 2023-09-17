import computerVision from "@/lib/computerVision";
import gpt from "@/lib/gpt";
import { supabaseServer } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const { imgURL, userId } = await request.json();

  const findImage = async () => {
    const { data, error } = await supabaseServer
      .from("profiles")
      .select("imgURLArray")
      .eq("id", userId)
      .single();

    if (!data || !data.imgURLArray) return;

    return data.imgURLArray.find((image) => image === imgURL);
  };

  const scan = async () => {
    const savedImgURL = await findImage();

    if (savedImgURL) {
      console.log("exists in DB");

      return savedImgURL;
    } else {
      const azureRes = await computerVision(imgURL);
      const gptRes = await gpt(azureRes);
      const useful = gptRes[0].message.content;

      if (!useful) return;

      console.log(useful);

      const { data: imgURLArrayData } = await supabaseServer
        .from("profiles")
        .select("imgURLArray")
        .eq("id", userId)
        .single();

      const { data: responseArrayData } = await supabaseServer
        .from("profiles")
        .select("responseArray")
        .eq("id", userId)
        .single();

      if (!imgURLArrayData) return;
      if (!responseArrayData) return;
      console.log("userId", userId);

      const { data: what } = await supabaseServer
        .from("profiles")
        .update({
          imgURLArray: imgURLArrayData.imgURLArray
            ? [...imgURLArrayData.imgURLArray, imgURL]
            : [imgURL],
        })
        .eq("id", userId)
        .select();

      console.log("what", what);

      await supabaseServer
        .from("profiles")
        .update({
          responseArray: responseArrayData.responseArray
            ? [...responseArrayData.responseArray, JSON.parse(useful)]
            : [useful],
        })
        .eq("id", userId);

      return useful;
    }
  };

  const result = await scan();

  return NextResponse.json({ response: result });
}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
