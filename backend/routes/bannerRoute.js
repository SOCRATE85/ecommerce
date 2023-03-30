const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
    createBanner,
    listBanners,
    getBanner,
    updateBanner,
    deleteBanner
} = require("../controllers/bannerController");
const router = express.Router();

router.route("/banner/new").post(isAuthenticatedUser, authorizeRole("admin"), createBanner);
router.route("/banner/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateBanner)
                            .delete(isAuthenticatedUser, authorizeRole("admin"), deleteBanner)
                            .get(isAuthenticatedUser, authorizeRole("admin"), getBanner);
router.route("/banners").get(isAuthenticatedUser, authorizeRole("admin"), listBanners);

module.exports = router;
