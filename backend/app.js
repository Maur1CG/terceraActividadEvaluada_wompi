import express from "express"
import registerClientRoutes from "./src/routes/registerClient.js"
import clientRoutes from "./src/routes/client.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import adminRoutes from "./src/routes/admin.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import loginClientRoutes from "./src/routes/loginClient.js"
import cookieParser from "cookie-parser";

const app = express ();

app.use(cookieParser())
app.use(express.json())

app.use("/api/registerClient", registerClientRoutes)
app.use("/api/client", clientRoutes)
app.use("/api/registerAdmin", registerAdminRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)
app.use("/api/loginClient", loginClientRoutes)

export default app;