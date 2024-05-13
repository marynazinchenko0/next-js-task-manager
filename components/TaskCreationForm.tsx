"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import addTask from "@/actions/addTask";

export const TaskCreationForm = () => {
  return (
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
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskCreationForm