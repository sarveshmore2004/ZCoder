import { useState } from "react";

const useExplainComment = () => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [error, setError] = useState(null);
    
  const explainComment = async (text) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB47e7XvCYcRTczVnLYfZyONtwl9xT6dQ4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch explanation");
      }

      const data = await response.json();
      setExplanation(data.candidates[0].content.parts[0].text);
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { explainComment, loading, explanation, error };
};

export default useExplainComment;
