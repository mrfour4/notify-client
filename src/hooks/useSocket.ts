import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(onNotification: (msg: string) => void) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("notification", (msg: string) => {
            onNotification(msg);
        });

        return () => {
            socket.disconnect();
        };
    }, [onNotification]);

    return socketRef.current;
}
