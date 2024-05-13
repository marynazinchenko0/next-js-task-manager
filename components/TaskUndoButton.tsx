"use client"
import {useState} from 'react'
import undoCompletionTask from '@/actions/undoCompletionTask'
import {Loader2, Undo2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast"

type Props = {
  id: number
}
export const TaskUndoButton: React.FC<Props> = ({id}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast()

  const undoCompletionTaskHandler = async () => {
    setIsLoading(true)
    await undoCompletionTask(id).then(() => {
      toast({
        title: "Task returned!",
      })
    }).catch(() => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }).finally(() =>
      setIsLoading(false)
    )
  }
  return (
    <Button onClick={undoCompletionTaskHandler} variant="secondary" disabled={isLoading} size="icon" className="hover:bg-green-200">
      {
        isLoading
          ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          : <Undo2 />
      }
    </Button>
  )
}

export default TaskUndoButton