# 📄 Notify Client (Next.js 15 App Router)

A Next.js App Router-based client that:

-   Connects to a NestJS Socket.IO server to **receive notifications** in real-time
-   Allows an admin to **send broadcast notifications** to all connected clients via a simple form UI

---

## ⚙️ 1. Installation

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

---

## 🧱 2. Project Structure

```
/app
  /admin
    page.tsx         # Admin notification sender UI
  /page.tsx          # Client listener for notifications (main route)
/hooks
  useSocket.ts        # Socket.IO client hook
.env.local            # Environment config for server URL
```

---

## 🌐 3. Runtime Environment

### ✅ Notify Server (NestJS backend)

-   Runs at `http://localhost:8080`
-   Must enable CORS:

```ts
// main.ts
app.enableCors({ origin: "*" });
```

### ✅ Notify Client (Next.js frontend)

-   Runs on `http://localhost:3000`
-   Create `.env.local`:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
```

---

## 🧑‍💼 4. Admin Page — Send Notification

-   Access via: `http://localhost:3000/admin`
-   Type a message and click **Send Notify**
-   Sends `POST` request to backend: `/admin/notify`

---

## 🛁 5. Client Page — Receive Notification

-   Access via: `http://localhost:3000/`
-   Automatically connects to Socket.IO server
-   On receiving a broadcast, it displays an `alert()` with the message

---

## 🛎 6. Example Notification Flow

Send from Postman or frontend:

```http
POST http://localhost:8080/admin/notify
{
  "message": "Hello from admin 👋"
}
```

Clients listening on `/` receive:

```js
alert("📢 Hello from admin 👋");
```

---

## 🧪 7. Quick Testing

1. Open `localhost:3000/` in multiple browser tabs
2. Go to `localhost:3000/admin` → type and send message
3. All tabs will receive and display the notification in real-time

---

## 💡 Suggestions for Expansion

-   Target specific users by `userId`
-   Save notifications to database
-   Support notification types: `chat`, `order`, `system`
-   Secure `/admin` route with JWT auth or role-based access

---

## © License

MIT — Built with ❤️ using Next.js + NestJS + Socket.IO
