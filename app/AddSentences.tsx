import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyBlock, dracula } from "react-code-blocks";

function AddSentences({
  setSentences,
}: {
  setSentences: Dispatch<SetStateAction<string[]>>;
}) {
  const [text, setText] = useState("");
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Add sentences</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run this on the console of a website</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="overflow-y-scroll max-h-[45vh] ">
                  <CopyBlock
                    text={`console.log(
  Array.from(
    new Intl.Segmenter("en", { granularity: "sentence" }).segment(
      Array.from(document.querySelectorAll("p"))
        .map((p) => p.innerText)
        .join(" ")
        .replace(/(\\r\\n|\\n|\\r)/gm, "")
        .replace(/\\[.{1,2}\\]/gm, "")
        .replace(/\\n/g, " ")
    )
  )
    .sort((a, b) => b.segment.length - a.segment.length)
    .slice(0, 5)
    .map((x) => x.segment)
    .join("\\n\\n")
);`}
                    language={"javascript"}
                    showLineNumbers={true}
                    theme={dracula}
                    codeBlock
                  />
                </div>
                <Textarea
                  placeholder="Paste Text Here!"
                  onChange={(e) => setText(e.target.value)}
                ></Textarea>
                <Button
                  onClick={() => {
                    setSentences((prev) => [
                      ...prev,
                      ...Array.from(
                        new Intl.Segmenter("en", {
                          granularity: "sentence",
                        }).segment(text)
                      ).map((s) => s.segment),
                    ]);
                  }}
                >
                  ADD
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSentences;
