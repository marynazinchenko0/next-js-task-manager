"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();
export default async function addTask(formData: FormData) {
  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");
  const taskPriority = formData.get("priority");
  console.log(taskTitle)
  if (!taskTitle || !taskDescription || !taskPriority) {
    return;
  }
  // Save todo item to supabase database
  const {  } = await supabase.from("tasks").insert({
    title: taskTitle,
    description: taskDescription,
    priority: taskPriority,
    deadline: '2014-05-10',
    created_at: new Date().toISOString(),
  });

  revalidatePath("/tasks");
}