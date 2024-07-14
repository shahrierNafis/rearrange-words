import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
function Sentences({
  sentences,
  setSentences,
}: {
  sentences: string[];
  setSentences: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <>
      <div className="">
        <Dialog>
          <DialogTrigger>
            <Button>show sentences {sentences.length}</Button>
          </DialogTrigger>
          <DialogContent
            className={"lg:max-w-[90vw] overflow-y-auto max-h-screen"}
          >
            <DialogHeader>
              <DialogTitle>Sentences</DialogTitle>
            </DialogHeader>{" "}
            <>
              <div className="flex flex-col ">
                {sentences.map((sentence, index) => {
                  return (
                    <div
                      key={sentence + index}
                      className="m-2 border flex justify-between"
                    >
                      <div>{sentence}</div>
                      <Button
                        variant={"destructive"}
                        onClick={() =>
                          setSentences((s) => {
                            const ns = Array.from(s);
                            ns.splice(index, 1);
                            return ns;
                          })
                        }
                      >
                        X
                      </Button>{" "}
                    </div>
                  );
                })}
              </div>
            </>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Sentences;
