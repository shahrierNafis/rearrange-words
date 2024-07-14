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
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <Textarea onChange={(e) => setText(e.target.value)}></Textarea>
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSentences;
