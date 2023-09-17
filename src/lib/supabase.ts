import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseServer = createServerComponentClient<Database>({
  cookies,
});
