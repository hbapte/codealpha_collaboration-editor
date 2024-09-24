import express from "express";
import * as documentController from "../modules/document/documentController";

const docRouter = express.Router();

docRouter.get("/:id", documentController.getDocument);
docRouter.post("/:id", documentController.saveDocument);

export default docRouter;
