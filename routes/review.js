const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const isloggedIn = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//FUNCTION FOR REVIEW VALIDATION:
let validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }
    else{
        next();
    }
}

//POST ROUTE
router.post("/",isloggedIn,validateReview,wrapAsync(reviewController.createReview))

//DELETE ROUTE
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports = router;