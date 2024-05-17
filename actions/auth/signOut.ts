"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";

const supabase = createClient();
export default async function signOut() {
  await supabase.auth.signOut();
  return redirect("/login");
}