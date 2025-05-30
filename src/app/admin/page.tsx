"use client";

import { useState } from "react";

export default function AdminPage() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const sendNotify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/notify`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),
                }
            );

            if (res.ok) {
                setStatus("✅ Sent: " + message);
                setMessage(""); // clear input
            } else {
                setStatus("❌ Failed to send");
            }
        } catch (err) {
            setStatus("❌ Error sending request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Admin: Send Notification</h1>
            <form onSubmit={sendNotify}>
                <input
                    className="w-full p-2 border mb-2"
                    type="text"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className={`px-4 py-2 rounded text-white ${
                        loading
                            ? "bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Sending..." : "Send Notify"}
                </button>
            </form>
            {status && <p className="mt-4">{status}</p>}
        </div>
    );
}
