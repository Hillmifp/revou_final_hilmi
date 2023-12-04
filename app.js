const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(express.json());

// Use the MySQL connection URI
const db = mysql.createConnection({
  uri: "mysql://avnadmin:AVNS_KEUOJt8hmNbC-eGDKyE@mysql-week16-adriantori11-revou.aivencloud.com:28384/revou_project?ssl-mode=REQUIRED",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Routes for disasters
app.post("/disasters", (req, res) => {
  const { USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION } =
    req.body;
  const sql =
    "INSERT INTO BENCANA (USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Error inserting disaster into the database" });
      } else {
        res.status(201).send({ id: result.insertId });
      }
    }
  );
});

// Route to get all disasters
app.get("/disasters", (req, res) => {
  const sql = "SELECT * FROM BENCANA";
  db.query(sql, (err, results) => {
    if (err) {
      res
        .status(500)
        .send({ error: "Error fetching disasters from the database" });
    } else {
      res.status(200).send(results);
    }
  });
});

// Route to update a disaster by ID
app.put("/disasters/:id", (req, res) => {
  const disasterId = req.params.id;
  const { USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION } =
    req.body;

  const sql =
    "UPDATE BENCANA SET USER_ID=?, BEN_DISASTER=?, BEN_LOCATION=?, BEN_TIME=?, BEN_DESCRIPTION=? WHERE BEN_ID=?";
  db.query(
    sql,
    [
      USER_ID,
      BEN_DISASTER,
      BEN_LOCATION,
      BEN_TIME,
      BEN_DESCRIPTION,
      disasterId,
    ],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Error updating disaster in the database" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send({ error: "Disaster not found" });
        } else {
          res.status(200).send({ message: "Disaster updated successfully" });
        }
      }
    }
  );
});

// Route to delete a disaster by ID
app.delete("/disasters/:id", (req, res) => {
  const disasterId = req.params.id;

  const sql = "DELETE FROM BENCANA WHERE BEN_ID=?";
  db.query(sql, [disasterId], (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ error: "Error deleting disaster from the database" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send({ error: "Disaster not found" });
      } else {
        res.status(200).send({ message: "Disaster deleted successfully" });
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
