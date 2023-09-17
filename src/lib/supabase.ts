import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

export const supabaseClient = createClientComponentClient<Database>();
export const supabaseServer = createServerComponentClient<Database>({
  cookies,
});
