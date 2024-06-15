const Listing = require("../models/listing.js");

module.exports.showTrending = async(req,res)=>{
    allListings = await Listing.find({category:"Trending"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showRooms = async(req,res)=>{
    allListings = await Listing.find({category:"Luxury Rooms"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showCities = async(req,res)=>{
    allListings = await Listing.find({category:"Iconic Cities"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showMountains = async(req,res)=>{
    allListings = await Listing.find({category:"Mountains"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showBeach = async(req,res)=>{
    allListings = await Listing.find({category:"Beach"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showPools = async(req,res)=>{
    allListings = await Listing.find({category:"Amazing Pools"});
    res.render("./listings/filterListings.ejs",{allListings}) 
 }

module.exports.showCamping = async(req,res)=>{
    allListings = await Listing.find({category:"Camping"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showFarms = async(req,res)=>{
    allListings = await Listing.find({category:"Farms"});
    res.render("./listings/filterListings.ejs",{allListings}) 
 }

module.exports.showArctic =async(req,res)=>{
    allListings = await Listing.find({category:"Arctic"});
    res.render("./listings/filterListings.ejs",{allListings}) 
}

module.exports.showDomes = async(req,res)=>{
    allListings = await Listing.find({category:"Domes"});
    res.render("./listings/filterListings.ejs",{allListings}) 
 }

module.exports.showBoats = async(req,res)=>{
    allListings = await Listing.find({category:"Boats"});
    res.render("./listings/filterListings.ejs",{allListings}) 
 }
