import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>
            <RotateCcw />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={() => setShuffledWords(null)}>Yes</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Reset;
