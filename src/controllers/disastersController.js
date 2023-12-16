const mysql = require("mysql2");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

const db = mysql.createPool({
  uri: "mysql://avnadmin:AVNS_KEUOJt8hmNbC-eGDKyE@mysql-week16-adriantori11-revou.aivencloud.com:28384/revou_project?ssl-mode=REQUIRED",
  multipleStatements: true,
});

const disastersController = {
  createDisaster: (req, res) => {
    const {
      USER_ID,
      DIS_TITLE,
      DIS_ADDRESS,
      DIS_TIME,
      DIS_DESCRIPTION,
      DIS_IMAGE,
      DIS_DONATION,
      DIS_LONGITUDE,
      DIS_LATITUDE,
      DIS_PROVINCE,
    } = req.body;

    const formattedDisTime = dayjs(DIS_TIME).format("YYYY-MM-DD HH:mm:ss");

    const sql =
      "INSERT INTO DISASTERS (USER_ID, DIS_TITLE, DIS_ADDRESS, DIS_TIME, DIS_DESCRIPTION, DIS_IMAGE, DIS_DONATION, DIS_LONGITUDE, DIS_LATITUDE, DIS_PROVINCE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        USER_ID,
        DIS_TITLE,
        DIS_ADDRESS,
        formattedDisTime,
        DIS_DESCRIPTION,
        DIS_IMAGE,
        DIS_DONATION,
        DIS_LONGITUDE,
        DIS_LATITUDE,
        DIS_PROVINCE,
      ],
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

  getDisasterById: (req, res) => {
    const disasterId = req.params.id;
    const sql = "SELECT * FROM DISASTERS WHERE DIS_ID = ?";
    db.query(sql, [disasterId], (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Error fetching disaster from the database" });
      } else {
        if (result.length === 0) {
          res.status(404).send({ error: "Disaster not found" });
        } else {
          res.status(200).send(result[0]);
        }
      }
    });
  },

  getDisastersByProvince: (req, res) => {
    const province = req.params.province;
    const sql = "SELECT * FROM DISASTERS WHERE DIS_PROVINCE = ?";
    db.query(sql, [province], (err, results) => {
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
    const {
      USER_ID,
      DIS_TITLE,
      DIS_ADDRESS,
      DIS_TIME,
      DIS_DESCRIPTION,
      DIS_IMAGE,
      DIS_DONATION,
      DIS_LONGITUDE,
      DIS_LATITUDE,
      DIS_PROVINCE,
    } = req.body;

    // Check if user has admin role or user_id === current user_id
    // Decode token from auth bearer
    const token = req.header("Authorization");
    const jwtToken = token.split(" ");
    const decodedToken = jwt.decode(jwtToken[1], { complete: true });
    console.log(token, decodedToken);
    const currentUserId = decodedToken ? decodedToken.payload.id : null;
    const currentUserRole = decodedToken ? decodedToken.payload.role : null;
    console.log(currentUserId, currentUserRole);
    // Check if user has admin role or user_id === current user_id
    if (currentUserRole !== 3 && currentUserId !== USER_ID) {
      return res.status(403).send({
        error: "Permission denied - Admin role or matching user_id required",
      });
    }

    const sql =
      "UPDATE DISASTERS SET USER_ID=?, DIS_TITLE=?, DIS_ADDRESS=?, DIS_TIME=?, DIS_DESCRIPTION=?, DIS_IMAGE=?, DIS_DONATION=?, DIS_LONGITUDE=?, DIS_LATITUDE=?, DIS_PROVINCE=? WHERE DIS_ID=?";
    db.query(
      sql,
      [
        USER_ID,
        DIS_TITLE,
        DIS_ADDRESS,
        DIS_TIME,
        DIS_DESCRIPTION,
        DIS_IMAGE,
        DIS_DONATION,
        DIS_LONGITUDE,
        DIS_LATITUDE,
        DIS_PROVINCE,
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
    const { USER_ID } = req.body;

    // Check if user has admin role or user_id === current user_id
    // Decode token from auth bearer
    const token = req.header("Authorization");
    const jwtToken = token.split(" ");
    const decodedToken = jwt.decode(jwtToken[1], { complete: true });
    console.log(token, decodedToken);
    const currentUserId = decodedToken ? decodedToken.payload.id : null;
    const currentUserRole = decodedToken ? decodedToken.payload.role : null;
    console.log(currentUserId, currentUserRole, USER_ID, req.body);

    // Check if user has admin role or user_id === current user_id
    if (currentUserRole !== 3 && currentUserId !== USER_ID) {
      return res.status(403).send({
        error: "Permission denied - Admin role or matching user_id required",
      });
    }

    const sql = "DELETE FROM DISASTERS WHERE DIS_ID=?";
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
