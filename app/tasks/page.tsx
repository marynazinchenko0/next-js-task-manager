import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {createClient} from "@/utils/supabase/server";
import TasksPagination from "@/components/TasksPagination";
import ListFilter from "@/components/ListFilter"
import TaskCreationForm from "@/components/TaskCreationForm";
import {getTasks} from "@/lib/tasks/queries";
import { TaskCard } from "@/components/TaskCard";

type SearchParams = {
  page: string;
  sortBy: string;
  priority: string;
  deadline: string;
};
export default async function Tasks({searchParams}: { searchParams: SearchParams }) {
  const supabase = createClient();

  const {page, sortBy, priority, deadline} = searchParams
  const pageSize = 6;
  const pageIndex = Number(page ?? '1') - 1;

  const {data: tasks, count: tasksTotal} = await getTasks(supabase, {
    pageIndex: pageIndex,
    perPage: pageSize,
    sortBy: sortBy,
    priority: priority,
    deadline: deadline
  })

  return (
    <>
      <h1 className="text-3xl font-semibold">Your tasks</h1>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <ListFilter></ListFilter>
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add task</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskCreationForm></TaskCreationForm>
            </CardContent>
          </Card>
          <div className="grid gap-6">
            {tasks && tasks.map(task => (
              <TaskCard key={task.id} task={task}></TaskCard>
              )
            )}
          </div>
        </div>
      </div>

      <TasksPagination
        pageSize={pageSize}
        tasksTotal={tasksTotal as number}
        currentPage={page ? Number(page) : 1}
      ></TasksPagination>
    </>
  )
}