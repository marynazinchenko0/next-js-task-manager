import {Pencil} from "lucide-react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TaskPriorityLabel from "@/components/TaskPriorityLabel";
import TaskDeleteButton from "@/components/TaskDeleteButton";
import TaskUndoButton from "@/components/TaskUndoButton";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import TaskUpdateForm from "@/components/TaskUpdateForm";
import TaskCompleteButton from "@/components/TaskCompleteButton";
import type {Task} from "@/types";

export const TaskCard: React.FC<{ task: Task }> = ({task}) => {
  return (
    <Card key={task.id} className={task.completed ? "bg-gray-200" : ''}>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>{task.title} </CardTitle>
          <TaskPriorityLabel priority={task.priority}></TaskPriorityLabel>
        </div>
      </CardHeader>
      <CardContent>
        <p> {task.description}</p>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex gap-2 justify-between">
        <div>
          <CardDescription>
            Deadline: {task.deadline}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <TaskDeleteButton id={task.id}></TaskDeleteButton>
          {task.completed
            ? <TaskUndoButton id={task.id}></TaskUndoButton>
            : <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="icon" className="hover:bg-blue-200">
                    <Pencil/>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <TaskUpdateForm task={task}></TaskUpdateForm>
                </DialogContent>
              </Dialog>

              <TaskCompleteButton id={task.id}></TaskCompleteButton>
            </>
          }
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard