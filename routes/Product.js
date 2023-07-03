const express= require("express")
const router= express.Router()

const {getAllProducts,getAllProductsTesting}=require("../Controllers/Product")

router.route("/").get(getAllProducts);
router.route("/Testing").get(getAllProductsTesting);

   module.exports = router;