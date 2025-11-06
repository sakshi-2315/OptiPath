"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AICareerChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error connecting to AI service." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center"> AI Career Chat</h1>

      <Card className="p-4 h-[400px] overflow-y-auto bg-gray-50 rounded-lg border">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Ask career-related questions like “How can I improve my resume?”
          </p>
        )}

        {messages.map((msg, i) => (
          <p
            key={i}
            className={`my-2 ${
              msg.role === "user" ? "text-blue-600 text-right" : "text-gray-800"
            }`}
          >
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </p>
        ))}
      </Card>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your career question..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
