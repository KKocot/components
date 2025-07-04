import { useState } from "react";
import { AutoComplete } from "./components/autocompleter";
import AiSelect, { type SelectProps } from "./components/ai-select";

const FRAMEWORKS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "WordPress",
  "Express.js",
  "Nest.js",
];

const getPlaceholder = (value: SelectProps) => {
  switch (value) {
    case "ai":
      return "AI Search";
    case "classic":
      return "Search...";
    case "users":
      return "Search users";
    case "userTopics":
      return "Search user topics";
    default:
      return "Search something";
  }
};

function App() {
  const [value, setValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<SelectProps>("ai");
  const placeholder = getPlaceholder(selectValue);
  return (
    <div className="not-prose mt-8 flex flex-col gap-4 items-center">
      <div className="flex">
        <AiSelect value={selectValue} onValueChange={setSelectValue} />
        <AutoComplete
          options={FRAMEWORKS}
          emptyMessage="No results."
          placeholder={placeholder}
          onValueChange={setValue}
          value={value}
        />
      </div>
      <span className="text-sm">
        Current value: {value !== "" ? value : "No value selected"}
      </span>
    </div>
  );
}

export default App;
