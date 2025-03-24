"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Unsubscribe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token || typeof token !== "string") {
      setMessage("Token Query Parameter not provided.");
      return;
    }

    fetch("https://xgbfuvduzaljhyepdmyk.supabase.co/functions/v1/newsletter_unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unsubscribe_token: token }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "Unsubscribed successfully!"))
      .catch(() => setMessage("An error occurred."));
  }, [token]);

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Unsubscribe to our newsletter</h2>
      <h1 className="text-xl">{message}</h1>
    </div>
  );
}
