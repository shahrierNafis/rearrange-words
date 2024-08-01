"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import useLocalStorageState from "use-local-storage-state";
import Reset from "./Reset";
import { Button } from "@/components/ui/button";

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

  const [words, setWords] = useState<Intl.SegmentData[]>([]);

  useEffect(() => {
    const words = Array.from(
      new Intl.Segmenter("en", { granularity: "word" }).segment(sentences[0])
    )
      .filter((w) => w.segment !== " ")
      .map((w, index) => {
        w.index = index;
        return w;
      });
    setWords(words);
    if (shuffledWords?.length) {
      return;
    }
    const shuffled = words.sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);

    return () => {};
  }, [sentences, setShuffledWords, shuffledWords]);

  if (!shuffledWords) return <></>;

  return (
    <>
      <>
        <Reset {...{ setShuffledWords }} />
        <div className="flex flex-wrap">
          {shuffledWords.map((w, index) => {
            const color = words[index]?.segment == w.segment ? "green" : "red";

            let marginLeft = [".", "!", "?", ",", "]"].includes(w.segment)
              ? "-2.5px"
              : "2.5px";
            let marginRight = ["["].includes(w.segment) ? "-2.5px" : "2.5px";

            if (["'", '"', "`"].includes(w.segment)) {
              const indexCount = shuffledWords
                .slice(0, index)
                .filter((w2) => w.segment == w2.segment).length;

              marginLeft = indexCount % 2 ? `-2.5px` : `2.5px`;
              marginRight = indexCount % 2 ? `2.5px` : `-2.5px`;
            }

            return (
              <div
                key={w.segment + index}
                style={{ color, marginLeft, marginRight }}
                className={""}
              >
                {w.segment}
              </div>
            );
          })}
        </div>
        <Reorder.Group
          //   axis="x"
          values={Array.from(shuffledWords)}
          onReorder={(a) => {
            setShuffledWords(a);
          }}
          //   className="flex flex-wrap gap-2"
        >
          {shuffledWords.map((item, index) => {
            const color =
              words[index]?.segment == item.segment ? "green" : "red";

            return (
              <Reorder.Item
                key={item.index}
                value={item}
                style={{ color, borderColor: color }}
                className={"border text-center text-lg p-2"}
              >
                {item.segment}
              </Reorder.Item>
            );
          })}
        </Reorder.Group>{" "}
        <Button
          onClick={() => {
            setSentences((s) => {
              const ns = Array.from(s);
              ns.shift();
              return ns;
            });
          }}
        >
          {words.toString() == shuffledWords.toString() ? "skip" : "next"}
        </Button>
      </>
    </>
  );
}

export default Rearrange;
