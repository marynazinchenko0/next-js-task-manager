"use client"
import {useTransition} from 'react'
import completeTask from "@/actions/completeTask";
import undoCompletionTask from '@/actions/undoCompletionTask'
import {ToastAction} from "@/components/ui/toast"
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast"

type Props = {
  id: number
}
export const TaskCompleteButton: React.FC<Props> = ({id}) => {
  const [ isPending, startTransition ] = useTransition()
  const {toast} = useToast()

  const undoCompletionTaskHandler = async () => {
    await undoCompletionTask(id)
  }

  const completeTaskHandler = () => {
    startTransition(async () => {
      await completeTask(id).then(() => {
        toast({
          title: "Task completed!.",
          description: "Task was deleted successfully!",
          action: <ToastAction onClick={undoCompletionTaskHandler} altText="Undo">Undo</ToastAction>,
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
    <Button onClick={completeTaskHandler} disabled={isPending} className="hover:bg-green-800">
      {
        isPending
          ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          : 'Complete'
      }
    </Button>
  )
}

export default TaskCompleteButton