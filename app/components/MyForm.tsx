"use client";
import React, { useState } from "react";
import { socket } from "@/socketio/client";
import { twMerge } from "tailwind-merge";

export default function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = (event: any, state: string) => {
    event.preventDefault();
    setIsLoading(true);
    if (!value) {
      alert("Set name!");
      setIsLoading(false);
      return;
    }

    console.log("Get in timeout");
    socket.timeout(500).emit("foo", JSON.stringify({ value, state }), () => {
      setIsLoading(false);
      console.log("Leaving timeout");
    });
  };

  return (
    <form>
      <input
        placeholder="Name"
        className="border border-black p-4"
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      />
      <button
        className={twMerge(
          "border border-black p-4",
          isLoading && "opacity-0.5"
        )}
        onClick={() => submit(event, "up")}
        disabled={isLoading}>
        👍
      </button>
      <button
        className={twMerge(
          "border border-black p-4",
          isLoading && "opacity-0.5"
        )}
        onClick={() => submit(event, "meh")}
        disabled={isLoading}>
        🙃
      </button>
      <button
        className={twMerge(
          "border border-black p-4",
          isLoading && "opacity-0.5"
        )}
        onClick={() => submit(event, "down")}
        disabled={isLoading}>
        👎
      </button>
    </form>
  );
}
