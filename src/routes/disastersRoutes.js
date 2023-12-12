const express = require("express");
const disastersController = require("../controllers/disastersController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

// Routes for disasters
router.post("/", authenticationMiddleware, disastersController.createDisaster);
router.get(
  "/:id",
  authenticationMiddleware,
  disastersController.getDisasterById
);
router.get("/", authenticationMiddleware, disastersController.getAllDisasters);
router.put(
  "/:id",
  authenticationMiddleware,
  disastersController.updateDisaster
);
router.delete(
  "/:id",
  authenticationMiddleware,
  disastersController.deleteDisaster
);

module.exports = router;
