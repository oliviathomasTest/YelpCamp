var express = require('express');
var router = express.Router();
var campGround = require("../models/campground");


//INDEX ROUTE
router.get("/",isLoggedIn,function(req,res){
	campGround.find({},function(err,campgrounds){
     if(err){
   			console.log(err);
   		}
   		else{
   			console.log("Retrieved from DB");
   			console.log(campgrounds);
   			res.render("campgrounds/campgrounds",{campsites : campgrounds});
   		}
	});
});

//CREATE ROUTE
router.post("/",isLoggedIn,function(req,res){
var name = req.body.campname;
var image = req.body.campimage;
var desc = req.body.campdesc;
var author = {
	id : req.user._id,
	username : req.user.username
};
var newObj = { name : name , image: image , description : desc, author : author};
//campsites.push(newObj);
campGround.create(newObj,function(err,campground){
	if(err){
		console.log(err);
	} else {
		console.log(campground);
		console.log("Entered into db");
		res.redirect("/campgrounds");
	}
})
});

//NEW ROUTE

router.get("/new",isLoggedIn,function(req,res){
 res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id",isLoggedIn, function(req,res){
	campGround.findById(req.params.id).populate("comments").exec(
		function(err,campground){
			if(err){
				console.log(err);
			} else {
				console.log("inside show route");
				console.log(campground);
				res.render("campgrounds/show",{campground : campground});
			}
		});
 
});

//EDIT ROUTE
router.get("/:id/edit",function(req,res){
	campGround.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err.message);
			res.redirect("/campgrounds");
		}
		else {
			res.render("campgrounds/edit",{campground : foundCampground});
		}
	});
});

//UPDATE ROUTE
router.put("/:id",function(req,res){
	campGround.findByIdAndUpdate(req.params.id, req.body.updated,function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else {
			console.log(req.params.id);
			console.log(req.body.updated);
			console.log("/////////////");
			console.log(updatedCampground);
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});




function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;