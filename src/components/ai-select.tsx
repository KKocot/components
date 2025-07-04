import { Bot, Search, AtSign, Slash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SelectProps = "ai" | "classic" | "users" | "userTopics";

const AiSelect = ({
  value,
  onValueChange,
}: {
  value: SelectProps;
  onValueChange: (value: SelectProps) => void;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ai">
            <Bot className="h-4 w-4" />
          </SelectItem>
          <SelectItem value="classic">
            <Search />
          </SelectItem>
          <SelectItem value="users">
            <AtSign />
          </SelectItem>
          <SelectItem value="userTopics">
            <Slash />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default AiSelect;
