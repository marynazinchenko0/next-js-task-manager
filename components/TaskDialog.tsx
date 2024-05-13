"use client"
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import addTask from "@/actions/addTask";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export const TaskDialog = () => {
  return (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full mb-5">
        <Plus className="mr-2 h-4 w-4"/> Add new task
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add new task</DialogTitle>
        <DialogDescription>
          You can add new task here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <form action={addTask} method="POST" className="mb-8">
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="What needs to be done?"
              required
            ></Input>
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe it!"
              required
            ></Textarea>
          </div>

          <div className="mb-4">
            <Label htmlFor="priority">Priority</Label>
            <div>
              <Select name="priority" required>
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
                type="text"
                placeholder="What needs to be done?"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
          <div>
            <Button type="submit">Add task</Button>
          </div>
        </form>
    </DialogContent>
  </Dialog>
  )
}

export default TaskDialog