"use client";

import { useSocket } from "@/hooks/useSocket";
import { useState } from "react";

export default function HelloPage() {
    const [messages, setMessages] = useState<string[]>([]);

    useSocket((msg) => {
        setMessages((prev) => [...prev, msg]);
        alert(`📢 ${msg}`);
    });

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Client Listening...</h1>
            <ul>
                {messages.map((m, i) => (
                    <li key={i}>✅ {m}</li>
                ))}
            </ul>
        </div>
    );
}
