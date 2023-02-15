const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
    addNewAddress,
    updateAddress,
    deleteAddress,
    getAllAddress,
    getAddress,
    validateAddress
} = require("../controllers/addressController");
const router = express.Router();

router.route("/address/validate").post(isAuthenticatedUser, validateAddress);
router.route("/address/new").post(isAuthenticatedUser, addNewAddress);
router.route("/address/:id").put(isAuthenticatedUser, updateAddress)
                            .delete(isAuthenticatedUser, deleteAddress)
                            .get(isAuthenticatedUser, getAddress);
router.route("/addresses").get(isAuthenticatedUser, getAllAddress);

module.exports = router;
