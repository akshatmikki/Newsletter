import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Unsubscribe() {
  const router = useRouter();
  const { token } = router.query;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-xl font-bold">{message}</h1>
    </div>
  );
}
