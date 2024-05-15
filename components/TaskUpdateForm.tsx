"use client";

import { useFormStatus } from "react-dom";
import updateTask from "@/actions/updateTask";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import type {Task} from "@/types";

function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2  className="mr-2 h-4 w-4 animate-spin"/>}
      Update
    </Button>
  );
}

export function TaskUpdateForm({ task }: { task: Task }) {
  return (
    <form action={updateTask}>
      <input type="hidden" name="id" value={task.id}/>
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="What needs to be done?"
          required
          defaultValue={task.title}
        ></Input>
      </div>

      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe it!"
          required
          defaultValue={task.description}
        ></Textarea>
      </div>

      <div className="mb-4">
        <Label htmlFor="priority">Priority</Label>
        <div>
          <Select name="priority" required  defaultValue={task.priority}>
            <SelectTrigger>
              <SelectValue placeholder="Select a priority"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="lowest">Lowest</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="highest">Highest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="deadline">Deadline</Label>
        <div>
          <input
            id="deadline"
            name="deadline"
            type="date"
            placeholder="What needs to be done?"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            defaultValue={task.deadline}
          />
        </div>
      </div>
      <UpdateButton/>
    </form>
  );
}

export default TaskUpdateForm;