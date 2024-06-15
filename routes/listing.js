const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const isloggedIn = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listing.js");



//FUNCTION FOR VALIDATION:
let validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }
    else{
        next();
    }
} 

router.route("/")
.get(wrapAsync(listingController.index))
.post(isloggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));

//CREATE ROUTE
router.get("/new",isloggedIn,listingController.renderNewForm)

//SHOW ROUTE
router.get("/:id/show",wrapAsync(listingController.showListing));

//CREATE ROUTE:

//EDIT ROUTE
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router.route("/:id")
.put(isloggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner,wrapAsync(listingController.destroyListing))

module.exports = router;
