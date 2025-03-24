"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Unsubscribe() {
  const searchParams = useSearchParams();
  const tokenFromURL = searchParams.get("token"); // Token from email link
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(tokenFromURL || ""); // Support both methods
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenFromURL) {
      handleUnsubscribe(tokenFromURL);
    }
  }, [tokenFromURL]);

  const handleUnsubscribe = async (tokenToUse: string) => {
    if (!tokenToUse) {
      setMessage("Missing unsubscribe token.");
      return;
    }

    setLoading(true);
    setMessage("Processing...");

    try {
      const response = await fetch(
        "https://xgbfuvduzaljhyepdmyk.supabase.co/functions/v1/newsletter_unsubscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ unsubscribe_token: tokenToUse }),
        }
      );

      const data = await response.json();
      setMessage(data.message || "Successfully unsubscribed!");
    } catch (error) {
      setMessage("Failed to unsubscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUnsubscribe(token || email);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Unsubscribe</h2>
      {message }
    </div>
  );
}
