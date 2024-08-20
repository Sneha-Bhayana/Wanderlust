
  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  let taxInfo = document.getElementsByClassName("tax-info");
  let TrendingFilter = document.getElementById("Trending");
  taxSwitch.addEventListener("click",()=>{
  for(info of taxInfo){
    if(info.style.display != "inline"){
      info.style.display = "inline"
    }else{
      info.style.display = "none"
    }
  }
  })


