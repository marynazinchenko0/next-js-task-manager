"use client"
import {useTransition} from 'react'
import deleteTask from "@/actions/deleteTask";
import {Trash2, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast"

type Props = {
  id: number
}
export const TaskDeleteButton: React.FC<Props> = ({id}) => {
  const [ isPending, startTransition ] = useTransition()
  const {toast} = useToast()
  const deleteTaskHandler = () => {
    startTransition(async() => {
      await deleteTask(id).then(() => {
        toast({
          title: "Task deleted.",
          description: "Task was deleted successfully!",
        })
      }).catch(() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      })
    })

  }
  return (
    <Button
      onClick={deleteTaskHandler}
      variant="secondary"
      size="icon"
      className="hover:bg-red-200"
      disabled={isPending}
    >
      {
        isPending
          ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          : <Trash2/>
      }
    </Button>
  )
}

export default TaskDeleteButton