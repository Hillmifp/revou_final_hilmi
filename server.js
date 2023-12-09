// src/server.js
const express = require("express");
const routes = require("./src/routes/disastersRoutes"); // Corrected path

const app = express();
const port = 3000;

app.use(express.json());

// Mount the aggregated router
app.use("/disasters", routes);

app.get("/status", (req, res) => {
  res.status(200).send({ message: "Hilmi Sukses" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
