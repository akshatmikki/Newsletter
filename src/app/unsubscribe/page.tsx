"use client"; // Ensure this is a client component

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Unsubscribe />
    </Suspense>
  );
}

function Unsubscribe() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetch("https://xgbfuvduzaljhyepdmyk.supabase.co/functions/v1/newsletter_unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unsubscribe_token: token }),
      })
        .then((res) => res.json())
        .then((data) => setMessage(data.message || "Unsubscribed successfully."))
        .catch(() => setMessage("Error while unsubscribing."));
    } else {
      setMessage("Token Query Parameter not provided.");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Unsubscribe</h1>
      <p>{message}</p>
    </div>
  );
}
