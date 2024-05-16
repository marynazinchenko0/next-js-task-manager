"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();
export default async function addTask(formData: FormData) {
  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");
  const taskPriority = formData.get("priority");
  const taskDeadline = formData.get("deadline");

  if (!taskTitle || !taskDescription || !taskPriority || !taskDeadline) {
    return;
  }
  const {  } = await supabase.from("tasks").insert({
    title: taskTitle,
    description: taskDescription,
    priority: taskPriority,
    deadline: taskDeadline,
    created_at: new Date().toISOString(),
  });

  revalidatePath("/tasks");
}