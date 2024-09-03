"use client";

import { Button } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        color="warning"
        variant="flat"
        startContent={<RefreshCcw />}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Refreash
      </Button>
    </div>
  );
}
