import express from "express";
import countriesController from "../../../controllers/countries";
import validator, { ValidationSource } from "../../../helpers/validator";
import schema from "./schema";

const router = express.Router();

router
  .route("/:id")
  .get(
    validator(schema.param, ValidationSource.PARAM),
    countriesController.getcountries
  );
export default router;
