"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export default async function updateTask(formData: FormData) {

  const taskId = formData.get("id");
  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");
  const taskPriority = formData.get("priority");
  const taskDeadline = formData.get("deadline");

  if (!taskId) {
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({ title: taskTitle, description: taskDescription, priority: taskPriority, deadline: taskDeadline})
    .eq("id", taskId);


  if (error) {
    console.error("Error completing task:", error);
    return;
  }

  revalidatePath("/tasks");
}
