const Listing = require("../models/listing");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });
 
module.exports.index = (async(req,res)=>{
    const allListings = await Listing.find({});
   
    // for(listing of allListings){
    //     let results = await geocodingClient.forwardGeocode({
    //         query: listing.location || "New Delhi",
    //         limit: 1
    //       })
    //         .send();
    //     listing.geometry = results.body.features[0].geometry;
    //     await Listing.updateMany({geometry:listing.geometry});
    // }
    res.render("/listings/index.ejs",{allListings});
})

module.exports.renderNewForm = (req,res)=>{
    res.render("/listings/new.ejs");
}

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }
    res.render("/listings/show.ejs",{listing});
}

module.exports.createListing = async(req,res)=>{
      
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    let response = await geocodingClient.forwardGeocode({
        query: newlisting.location || "New Delhi",
        limit: 1
      })
        .send();
    console.log(response.body.features[0].geometry);
    newlisting.owner = req.user._id;
    newlisting.image = {url , filename};
    newlisting.geometry = response.body.features[0].geometry;
    await newlisting.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}


module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("w=800","w=250&h=250");
    res.render("/listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
       let url = req.file.path;
       let filename = req.file.filename;
       listing.image = {url , filename};
       await listing.save();
    }
    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}/show`);
}

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}