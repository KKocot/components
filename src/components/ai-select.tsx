import { Bot, Search, AtSign, Slash, Hash, PersonStanding } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SelectProps =
  | "ai"
  | "classic"
  | "users"
  | "userTopics"
  | "tags"
  | "community";

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
            <Bot />
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
          <SelectItem value="tags">
            <Hash />
          </SelectItem>
          <SelectItem value="community">
            <PersonStanding />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default AiSelect;
