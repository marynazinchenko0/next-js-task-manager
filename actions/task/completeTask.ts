"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export default async function completeTask(taskId: number) {

  if (!taskId) {
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("id", taskId);

  if (error) {
    console.error("Error completing task:", error);
    return;
  }

  revalidatePath("/tasks");
}