"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export default async function deleteTask(taskId: number) {

  if (!taskId) {
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error);
    return;
  }

  revalidatePath("/tasks");
}