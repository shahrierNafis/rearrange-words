"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { diffWords } from "diff";
import useLocalStorageState from "use-local-storage-state";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reset from "./Reset";

function Rearrange({
  sentences,
  setSentences,
}: {
  sentences: string[];
  setSentences: Dispatch<SetStateAction<string[]>>;
}) {
  const [shuffledWords, setShuffledWords] = useLocalStorageState<
    Intl.SegmentData[] | null
  >("shuffled", { defaultValue: [] });

  const [text, setText] = useState("");

  useEffect(() => {
    const words = Array.from(
      new Intl.Segmenter("en", { granularity: "word" }).segment(sentences[0])
    )
      .filter((w) => w.segment !== " ")
      .map((w, index) => {
        w.index = index;
        return w;
      });
    setText(words.map((w) => w.segment).join(" "));
    if (shuffledWords?.length) {
      return;
    }
    const shuffled = words.sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);

    return () => {};
  }, [sentences, setShuffledWords, shuffledWords]);

  if (!shuffledWords) return <></>;

  const diff = diffWords(shuffledWords.map((x) => x.segment).join(" "), text);
  return (
    <>
      <>
        <Reset {...{ setShuffledWords }} />
        <div>
          {diff.map((part) => {
            const color = part.added ? "red" : part.removed ? "red" : "green";

            return (
              <>
                <div style={{ color }} className={"inline"}>
                  {!part.added && part.value}
                </div>
              </>
            );
          })}
        </div>
        <Reorder.Group
          //   axis="x"
          values={Array.from(shuffledWords)}
          onReorder={(a) => {
            setShuffledWords(a);
            if (
              a.every((item, index) => !item.isWordLike || item.index === index)
            ) {
              setShuffledWords(null);
              setSentences((s) => {
                const ns = Array.from(s);
                ns.shift();
                return ns;
              });
            }
          }}
          //   className="flex flex-wrap gap-2"
        >
          {shuffledWords.map((item, index) => (
            <Reorder.Item
              key={item.index}
              value={item}
              className={"border text-center text-xs"}
            >
              {item.segment}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </>
    </>
  );
}

export default Rearrange;
