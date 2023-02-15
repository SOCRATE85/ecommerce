const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const { 
      createCategory, 
      getAllCategories, 
      deleteCategory, 
      getFilterSortingRecord, 
      getCategory, 
      getCategoryDetailsForAdmin, 
      updateCategory, 
      getCategoriesFormFrontEnd
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/categorytree").get(getCategoriesFormFrontEnd);
router.route("/admin/category/new").post(isAuthenticatedUser, authorizeRole("admin"), createCategory);
router.route("/admin/categories").get(isAuthenticatedUser, getAllCategories);
router.route("/admin/category/:id")
      .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCategory)
      .get(isAuthenticatedUser, authorizeRole("admin"), getCategoryDetailsForAdmin)
      .put(isAuthenticatedUser, authorizeRole("admin"), updateCategory);
router.route("/categories").get(getAllCategories);      
router.route("/category/:id").get(getCategory);
router.route("/filtersorting/:id").get(getFilterSortingRecord);

module.exports = router;
