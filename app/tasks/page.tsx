import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Pencil} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TaskPriorityLabel from '@/components/TaskPriorityLabel'
import {createClient} from "@/utils/supabase/server";
import TaskDeleteButton from "@/components/TaskDeleteButton";
import TasksPagination from "@/components/TasksPagination";
import TaskDialog from "@/components/TaskDialog"
import TaskCompleteButton from "@/components/TaskCompleteButton";
import TaskUndoButton from "@/components/TaskUndoButton";
import ListFilter from "@/components/ListFilter"

// TODO Type - seacrhParams
// @ts-ignore
export default async function Tasks({searchParams}) {
  const supabase = createClient();

  const {page} = searchParams
  const pageSize = 6;
  const pageIndex = page || 1;

  const {data: tasks, count: tasksTotal} = await supabase
    .from('tasks')
    .select('*', {count: 'exact'})
    .limit(pageSize)
    .range((pageIndex - 1) * pageSize, pageIndex * pageSize)
    .order('completed')

  console.log(tasks)

  return (
    <>
      <h1 className="text-3xl font-semibold">Your tasks</h1>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <ListFilter></ListFilter>
        <div>
          <TaskDialog></TaskDialog>
          <div className="grid gap-6">
            {tasks && tasks.map(task => (
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


                      {task.completed
                        ?
                        <>
                          <TaskUndoButton id={task.id}></TaskUndoButton>
                          <TaskDeleteButton id={task.id}></TaskDeleteButton>
                        </>
                        :
                        <>
                          <TaskDeleteButton id={task.id}></TaskDeleteButton>
                          <Button variant="secondary" size="icon" className="hover:bg-blue-200"><Pencil/></Button>
                          <TaskCompleteButton id={task.id}></TaskCompleteButton>
                        </>
                      }
                    </div>

                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
      </div>

      <TasksPagination pageSize={pageSize} tasksTotal={tasksTotal as number} currentPage={+pageIndex}></TasksPagination>
    </>
  )
}