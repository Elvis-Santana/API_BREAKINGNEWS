import express from "express";
import "dotenv/config";
const app = express();
const PORT = Number(process.env.PORT);
app.get("/Home", (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
