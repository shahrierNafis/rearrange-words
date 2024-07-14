import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
function Reset({
  setShuffledWords,
}: {
  setShuffledWords: (
    val:
      | Intl.SegmentData[]
      | ((prevState: Intl.SegmentData[] | null) => Intl.SegmentData[] | null)
      | null
  ) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <RotateCcw />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription></DialogDescription>
          <Button onClick={() => setShuffledWords(null)}>Yes</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Reset;
