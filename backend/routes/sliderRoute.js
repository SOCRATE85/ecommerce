const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
    createSlider,
    listSliders,
    updateSlider,
    getSlider,
    deleteSlider
} = require("../controllers/sliderController");
const router = express.Router();

router.route("/slider/new").post(isAuthenticatedUser, authorizeRole("admin"), createSlider);
router.route("/slider/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateSlider)
                            .delete(isAuthenticatedUser, authorizeRole("admin"), deleteSlider)
                            .get(isAuthenticatedUser, authorizeRole("admin"), getSlider);
router.route("/sliders").get(isAuthenticatedUser, authorizeRole("admin"), listSliders);

module.exports = router;
