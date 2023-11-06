"use client";
import React from "react";
import { socket } from "@/socketio/client";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button className="border p-2" onClick={connect}>
        Connect
      </button>
      <button className="border p-2" onClick={disconnect}>
        Disconnect
      </button>
    </>
  );
}
