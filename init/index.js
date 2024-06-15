const mongoose = require("mongoose");
const allData = require("./data.js");
const listing = require("../models/listing.js");

main()
   .then(()=>{console.log("connection formed")})
   .catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

let data = async () => {
    await listing.deleteMany({});
    allData.data = allData.data.map((obj)=>({...obj, owner: "666133b01b632cb071d403eb"}));
    allData.data = allData.data.map((obj)=>({...obj, geometry:{type:"Point",coordinates:[77.2088,28.6139]}}));
    await listing.insertMany(allData.data);
}

data();