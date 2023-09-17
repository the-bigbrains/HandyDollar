import computerVision from "@/lib/computerVision";
import gpt from "@/lib/gpt";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const test = await request.json();

  if (!request.body) return;

  const findReceipt = async (imgURL: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    console.log("user id", user.id);
    const { data, error } = await supabase
      .from("profiles")
      .select("receipt")
      .eq("id", user.id)
      .single();

    if (!data || !data.receipt) return;

    return data.receipt.find((r) => r.img_url === imgURL);
  };

  const scan = async (imgURL: string) => {
    const receipt = await findReceipt(imgURL);

    if (receipt) {
      return receipt.response;
    } else {
      const azureRes = await computerVision(imgURL);
      const gptRes = await gpt(azureRes);

      console.log(gptRes[0].message.content);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user?:", user);

      if (!user) return;
      console.log("user!");

      const { data, error } = await supabase
        .from("profiles")
        .select("receipt")
        .eq("id", user.id)
        .single();

      console.log("data?");

      if (!data || !data.receipt) return;

      supabase.from("profiles").update({
        receipt: [
          ...data.receipt,
          { img_url: imgURL, response: gptRes[0].message.content },
        ],
      });

      return gptRes[0].message.content;
    }
  };

  const yo = await scan(test);

  return NextResponse.json({ message: yo });
}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
