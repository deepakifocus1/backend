import express from "express";
import {
  createDropdownController,
  deleteDropdownOptionController,
  fetchAllDropdownsController,
  updateDropdownController,
} from "../controllers/dropdownController";

const router = express.Router();

router.post("/", createDropdownController);
router.get("/", fetchAllDropdownsController);
router.put("/:id", updateDropdownController);
router.delete("/:id", deleteDropdownOptionController);

export default router;
