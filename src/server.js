import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./config/prisma.config.js";
import shutdown from "./utils/shutdown.util.js"; //export default เปลี่ยนชื่อได้

dotenv.config();
// console.log(process.env.PORT)

// console.log(app)

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => console.log("Server on :", PORT));

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException",()=>shutdown("uncaughtException"))
process.on("unhandledRejection",()=>shutdown("unhandledRejection"))

// prisma.user.count().then(rs => console.log(rs ))    //promise
// prisma.user.count().then(console.log)                // ย่อ

// prisma.$queryRaw`Select * from user`.then(console.log)
