import express from "express";
import formidable from "express-formidable";
const router = express();

// controllers
import {
  addProduct,
  removeProduct,
  updateProductDetails,
  fetchProductById,
  fetchProducts,
  fetchAllProducts,
  fetchTopProducts,
  fetchNewProducts,
  addProductReview,
  filterProducts,
} from "../controllers/productControllers.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
    .route("/")
    .get(fetchProducts)
    .post(authenticate, authorizedAdmin, formidable(), addProduct)

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
    
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);


router
    .route("/:id")
    .get(fetchProductById)
    .put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
    .delete(authenticate, authorizedAdmin, removeProduct);


router.route('/filtered-products').post(filterProducts)

export default router;
