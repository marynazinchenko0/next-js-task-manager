import {ChevronDown, Menu, ChevronsDown, ChevronUp, ChevronsUp} from "lucide-react"

// TODO:  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
type Props = {
  priority: string;
};

export const PriorityLabel: React.FC<Props> = ({priority}) => {
  switch (priority) {

    case "lowest":
      return <ChevronDown color="#368af7"/>;
    case "low":
      return <ChevronsDown color="#368af7"/>;
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

export default PriorityLabel