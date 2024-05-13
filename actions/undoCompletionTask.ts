"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export default async function undoCompletionTask(taskId: number) {

  if (!taskId) {
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: false })
    .eq("id", taskId);

  if (error) {
    console.error("Error changing completed status:", error);
    return;
  }

  revalidatePath("/tasks");
}