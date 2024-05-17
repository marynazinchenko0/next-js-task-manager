import {ChevronDown, Menu, ChevronsDown, ChevronUp, ChevronsUp} from "lucide-react"

type Props = {
  priority: string;
};

export const TaskPriorityLabel: React.FC<Props> = ({priority}) => {
  switch (priority) {

    case "lowest":
      return <ChevronsDown color="#368af7"/>;
    case "low":
      return <ChevronDown color="#368af7"/>;
    case "medium":
      return <Menu color="#fa9f1e"/>;
    case "high":
      return <ChevronUp color="#ef0101"/>;
    case "highest":
      return <ChevronsUp color="#ef0101"/>;

    default:
      return ""
  }
}

export default TaskPriorityLabel