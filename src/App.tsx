import { useEffect, useState } from "react";
import { AutoComplete } from "./components/autocompleter";
import AiSelect, { type SelectProps } from "./components/ai-select";
import clsx from "clsx";

const PROMPTS = [
  "Help me write a blog post about React",
  "Create a TypeScript interface for a user model",
  "Generate unit tests for my API",
  "Explain how to use React hooks",
  "Debug my Redux state management",
  "Optimize my React component performance",
  "Write a custom React hook",
  "Create a REST API endpoint",
  "Implement user authentication",
  "Design a database schema",
];
const USERNAMES = [
  "john_doe",
  "jane_smith",
  "alice_jones",
  "bob_brown",
  "charlie_black",
  "dave_white",
  "eve_green",
  "frank_yellow",
  "grace_purple",
  "heidi_orange",
];

const getPlaceholder = (value: SelectProps) => {
  switch (value) {
    case "ai":
      return "AI Search...";
    case "classic":
      return "Search...";
    case "users":
      return "Search users...";
    case "userTopics":
      return "Username...";
    case "tags":
      return "Search tags...";
    case "community":
      return "Search community...";
    default:
      return "Search something...";
  }
};

function App() {
  const [value, setValue] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<SelectProps>("ai");
  const placeholder = getPlaceholder(selectValue);

  useEffect(() => {
    if (value.startsWith("/")) {
      setSelectValue("userTopics");
      setValue(value.slice(1));
    }
    if (value.startsWith("%")) {
      setSelectValue("ai");
      setValue(value.slice(1));
    }
    if (value.startsWith("@")) {
      setSelectValue("users");
      setValue(value.slice(1));
    }
    if (value.startsWith("#")) {
      setSelectValue("tags");
      setValue(value.slice(1));
    }
    if (value.startsWith("!")) {
      setSelectValue("community");
      setValue(value.slice(1));
    }
  }, [value]);
  return (
    <div className="not-prose mt-8 flex flex-col gap-4 items-center">
      <div className="flex">
        <AiSelect value={selectValue} onValueChange={setSelectValue} />
        <AutoComplete
          options={
            selectValue === "users" || selectValue === "userTopics"
              ? USERNAMES
              : PROMPTS
          }
          emptyMessage="No results."
          placeholder={placeholder}
          onValueChange={setValue}
          value={value}
          className={clsx("", {
            "border-r-1 rounded-none pr-0": selectValue === "userTopics",
          })}
        />
        {selectValue === "userTopics" ? (
          <>
            <div className="h-8 border" />
            <AutoComplete
              options={PROMPTS}
              emptyMessage="No results."
              placeholder="Search topic..."
              onValueChange={setSecondValue}
              value={secondValue}
              className="pl-1"
            />
          </>
        ) : null}
      </div>
      <span className="text-sm">
        Current value: {value !== "" ? value : "No value selected"}
      </span>
    </div>
  );
}

export default App;
