import express from "express";
import cors from "cors";
import actionRoutes from "./routes/api/action/action.route";
import entryRoutes from "./routes/api/entry/entry.route";

const app = express();
const PORT = process.env.PORT || 1337;

app.use(
  cors({
    origin: ["https://avtostatus.com", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api", actionRoutes);
app.use("/api", entryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
