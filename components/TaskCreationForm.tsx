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
import addTask from "@/actions/task/addTask";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
{/*TODO: implement loader and toasts after submit here?*/}
export const TaskCreationForm = () => {
  return (
    <form action={addTask}>
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
            type="date"
            placeholder="What needs to be done?"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
      </div>
      <div>
        <Button className="w-full" type="submit">
          <Plus className="mr-2 h-4 w-4"/> Add Task
        </Button>
      </div>
    </form>
  )
}

export default TaskCreationForm