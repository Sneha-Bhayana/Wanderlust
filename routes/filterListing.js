const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const filterController = require("../controllers/filterListing.js");

router.get("/trending",wrapAsync(filterController.showTrending))

router.get("/rooms",wrapAsync(filterController.showRooms))

router.get("/cities",wrapAsync(filterController.showCities))

router.get("/mountains",wrapAsync(filterController.showMountains))

router.get("/beach",wrapAsync(filterController.showBeach))

router.get("/pools",wrapAsync(filterController.showPools))

router.get("/camping",wrapAsync(filterController.showCamping))

router.get("/farms",wrapAsync(filterController.showFarms))

router.get("/arctic",wrapAsync(filterController.showArctic))

router.get("/domes",wrapAsync(filterController.showDomes))

router.get("/boats",wrapAsync(filterController.showDomes))

module.exports = router; 