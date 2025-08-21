import { useEffect, useState } from "react";
import { AutoComplete } from "./components/autocompleter";
import AiSelect, { type SelectProps } from "./components/ai-select";
import clsx from "clsx";
import { Slash } from "lucide-react";
import { Separator } from "@radix-ui/react-select";

const PROMPTS = [
  "denser as a new hive.blog frontend",
  "how hive works",
  "hivemind architecture",
  "hivefest 2024 schedule",
  "calculate vests to hive power",
  "convert HIVE to HBD with Wax",
  "delegate hive power with Wax",
  "witness voting guide",
  "resource credits explained",
  "latest clive release",
  "account recovery process",
  "hive engine tokens list",
  "curation reward strategy",
  "power up vs power down",
  "web3 social onboarding",
];
const USERNAMES = [
  "gtg",
  "blocktrades",
  "barddev",
  "guest4test",
  "thebeedevs",
  "small.minion",
  "mtyszczak",
  "fwaszkiewicz",
  "itsola",
];
const TAGS = [
  "hive",
  "blockchain",
  "cryptocurrency",
  "nft",
  "dao",
  "defi",
  "web3",
  "metaverse",
  "social",
  "community",
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
    if (value.startsWith("$")) {
      setSelectValue("classic");
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
  }, [value]);
  return (
    <div className="not-prose mt-8 flex flex-col gap-4 items-center">
      <div className="flex">
        <AiSelect value={selectValue} onValueChange={setSelectValue} />
        <AutoComplete
          options={
            selectValue === "users" || selectValue === "userTopics"
              ? USERNAMES
              : selectValue === "tags"
              ? TAGS
              : PROMPTS
          }
          emptyMessage="No results."
          placeholder={placeholder}
          onValueChange={setValue}
          value={value}
          className={clsx("", {
            "rounded-none border-r-0 p-0 w-22": selectValue === "userTopics",
          })}
        />
        {selectValue === "userTopics" ? (
          <>
            <Separator className="w-[1px] h-8 bg-slate-400" />
            <AutoComplete
              options={PROMPTS}
              emptyMessage="No results."
              placeholder="Search topic..."
              onValueChange={setSecondValue}
              value={secondValue}
              className="pl-1 w-32"
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
