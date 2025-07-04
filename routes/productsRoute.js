import { Router } from "express";
import { getAllProductsHandler, createProductHandler, updateProductHandler, deleteProductHandler } from "../controllers/productsControllers.js";


const router = Router();

router.get("/", getAllProductsHandler)
    .post("/", createProductHandler)
    .put("/:id", updateProductHandler)
    .delete("/:id", deleteProductHandler);

export default router;