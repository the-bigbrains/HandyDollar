import getTxArray from "@/lib/getTxArray";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const temp = await request.json();
  const result = await getTxArray(temp);
  return NextResponse.json(result);
}
