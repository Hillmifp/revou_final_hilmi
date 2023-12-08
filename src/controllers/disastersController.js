const mysql = require("mysql2");
const dayjs = require("dayjs");

const db = mysql.createPool({
  uri: "mysql://avnadmin:AVNS_KEUOJt8hmNbC-eGDKyE@mysql-week16-adriantori11-revou.aivencloud.com:28384/revou_project?ssl-mode=REQUIRED",
  multipleStatements: true,
});

const disastersController = {
  createDisaster: (req, res) => {
    const { USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION } =
      req.body;

    const formattedBENTime = dayjs(BEN_TIME).format("YYYY-MM-DD HH:mm:ss");

    const sql =
      "INSERT INTO DISASTERS (USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [USER_ID, BEN_DISASTER, BEN_LOCATION, formattedBENTime, BEN_DESCRIPTION],
      (err, result) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          res.status(201).send({ id: result.insertId });
        }
      }
    );
  },

  getAllDisasters: (req, res) => {
    const sql = "SELECT * FROM DISASTERS";
    db.query(sql, (err, results) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Error fetching disasters from the database" });
      } else {
        res.status(200).send(results);
      }
    });
  },

  updateDisaster: (req, res) => {
    const disasterId = req.params.id;
    const { USER_ID, BEN_DISASTER, BEN_LOCATION, BEN_TIME, BEN_DESCRIPTION } =
      req.body;

    const sql =
      "UPDATE DISASTERS SET USER_ID=?, BEN_DISASTER=?, BEN_LOCATION=?, BEN_TIME=?, BEN_DESCRIPTION=? WHERE BEN_ID=?";
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
  },

  deleteDisaster: (req, res) => {
    const disasterId = req.params.id;

    const sql = "DELETE FROM DISASTERS WHERE BEN_ID=?";
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
  },
};

module.exports = disastersController;
