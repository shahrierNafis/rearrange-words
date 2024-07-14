"use client";
import AddSentences from "./AddSentences";
import useLocalStorageState from "use-local-storage-state";
import Sentences from "./Sentences";
import { Button } from "@/components/ui/button";
import Rearrange from "./Rearrange";

export default function Home() {
  const [sentences, setSentences] = useLocalStorageState<string[]>(
    "sentences",
    { defaultValue: [] }
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <Sentences {...{ sentences, setSentences }}></Sentences>
        <AddSentences {...{ setSentences }} />
        <Rearrange {...{ sentences, setSentences }}></Rearrange>
        <Button
          onClick={() => {
            setSentences((s) => {
              const ns = Array.from(s);
              ns.shift();
              return ns;
            });
          }}
        >
          skip
        </Button>
      </div>
    </>
  );
}
