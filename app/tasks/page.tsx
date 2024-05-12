import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PriorityLabel from '@/components/PriorityLabel'
import { createClient } from "@/utils/supabase/server";

export default async function Tasks() {
  const supabase = createClient();

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .range(0, 9)

  return (
    <>
      <h1 className="text-3xl font-semibold">Your tasks</h1>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          <Link href="#">Security</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
        <div>
          <Button className="w-full mb-5">
            <Plus className="mr-2 h-4 w-4"/> Add new task
          </Button>
          <div className="grid gap-6">
            {tasks && tasks.map(task => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex flex-row justify-between">
                      <CardTitle>{task.title}</CardTitle>
                      <PriorityLabel priority={task.priority}></PriorityLabel>
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
                      <Button variant="secondary">Edit</Button>
                      <Button>Complete</Button>
                    </div>

                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}