'use client'; // Error components must be client components
// This error component is for dashboard errors only
// If error occurs let's say in [project]/page, the entire route won't crash, only that
// specific route won't show. Navbar will be fine in this case.

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-red-500">Something went wrong!</h2>
      <button
        onClick={
          // Attempt recover by trying to re-render the segment
          () => reset()
        }
      >
        Try Again
      </button>
    </div>
  );
}
