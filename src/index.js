import dotenv from "dotenv"
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config()

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;

const startServer = (port) => {

    const server = app.listen(port, (req, res) => {
        console.log(`✅ Server is running at http://localhost:${port}`)
    })

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.warn(`⚠️  Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1)//try next port
        }
        else {
            console.error("❌ Server error:", err);
            process.exit(1);
        }
    })

}


connectDB()
    .then(() => {
        startServer(DEFAULT_PORT)
    })
    .catch((err) => {
        console.error("MONGO_DB CONNECTION FAILED !!! ", err);
    })

