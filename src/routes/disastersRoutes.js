const express = require("express");
const disastersController = require("../controllers/disastersController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

// Routes for disasters
router.post(
  "/disasters",
  authenticationMiddleware,
  disastersController.createDisaster
);
router.get(
  "/disasters/:id",
  authenticationMiddleware,
  disastersController.getDisasterById
);
router.get("/", authenticationMiddleware, disastersController.getAllDisasters);
router.put(
  "/disasters/:id",
  authenticationMiddleware,
  disastersController.updateDisaster
);
router.delete(
  "/disasters/:id",
  authenticationMiddleware,
  disastersController.deleteDisaster
);

module.exports = router;
