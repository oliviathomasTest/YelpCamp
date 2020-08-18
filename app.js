var express   = require('express'),
    app       = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    campGround = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require("./models/User"),
    seedDB = require('./seed'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    CommentRoutes = require('./routes/comments'),
    IndexRoutes = require('./routes/index'),
    CampgroundRoutes = require('./routes/campgrounds');
   

    //seedDB();

   mongoose.connect("mongodb://localhost:27017/yelp_camp",{
   	useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : true
   })
   .then( () => console.log("CONNECTED TO DB!!!"))
   .catch((err) => console.log(err.message));

  

   // var yelpSchema = new mongoose.Schema({
   // 	name : String,
   // 	image : String,
   // 	description : String
   // });

   // var campGround = mongoose.model("campGround",yelpSchema);

   // campGround.create(
   // 	{name:"Mountain Hill", 
   // 	image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
   // 	description : "It is on top of a mountain and has a lot of greenery."
   // },function(err,campground){
   // 	if(err){
   // 			console.log(err);
   // 		}
   // 		else{
   // 			console.log("ENTERED INTO DB");
   // 			console.log(campground);
   // 		}
   // });


// var campsites =[{name:"Mountain Hill", image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Make my Trip", image: "https://images.unsplash.com/photo-1517217451453-818405428795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Campers", image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Mountain Hill", image: "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Make my Trip", image: "https://images.unsplash.com/photo-1516013894828-b214a58fdba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Campers", image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Mountain Hill", image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Make my Trip", image: "https://images.unsplash.com/photo-1517217451453-818405428795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
// {name:"Campers", image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(require('express-session')({
  secret : "Olivia Thomas",
  resave : false,
  saveUninitialized : false
})
);


app.use(passport.initialize());
app.use(passport.session());
app.use(function isLoggedIn(req,res,next){
    res.locals.user = req.user;
    next();
});
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


 app.use(IndexRoutes);
 app.use("/campgrounds",CampgroundRoutes);
 app.use("/campgrounds/:id/comments",CommentRoutes);

// app.get("/",function(req,res){
// res.render("landingpage");
// });

// //INDEX ROUTE
// app.get("/campgrounds",function(req,res){
// 	campGround.find({},function(err,campgrounds){
//      if(err){
//    			console.log(err);
//    		}
//    		else{
//    			console.log("Retrieved from DB");
//    			console.log(campgrounds);
//    			res.render("campgrounds/campgrounds",{campsites : campgrounds});
//    		}
// 	});
// });

// //CREATE ROUTE
// app.post("/campgrounds",function(req,res){
// var name = req.body.campname;
// var image = req.body.campimage;
// var desc = req.body.campdesc;
// var newObj = { name : name , image: image , description : desc};
// //campsites.push(newObj);
// campGround.create(newObj,function(err,campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(campground);
// 		console.log("Entered into db");
// 		res.redirect("/campgrounds");
// 	}
// })
// });

// //NEW ROUTE

// app.get("/campgrounds/new",function(req,res){
//  res.render("campgrounds/new");
// });

// //SHOW ROUTE
// app.get("/campgrounds/:id",function(req,res){
// 	campGround.findById(req.params.id).populate("comments").exec(
// 		function(err,campground){
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log("inside show route");
// 				console.log(campground);
// 				res.render("campgrounds/show",{campground : campground});
// 			}
// 		});
 
// });


// //NEW COMMENT ROUTE
// app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
//   campGround.findById(req.params.id,function(err,campground){
//     if(err) console.log(err);
//     else {
//     res.render("comment/new",{campground : campground});
//   }
//   });
// });

// app.post("/campgrounds/:id/comments",function(req,res){
//   campGround.findById(req.params.id,function(err,campground){
//       if(err) console.log(err);
//       else {
//         Comment.create(req.body.comment,function(err,comment){
//             if(err){
//               console.log(err);
//             } else {
//               campground.comments.push(comment);
//               campground.save();
//               res.redirect("/campgrounds/"+ campground._id);
//             }
//         });
//       }
//   });
// });



// //REGISTER ROUTES
// app.get("/register",function(req,res){
//   res.render("register");
// });

// app.post("/register",function(req,res){
//   var newUser = new User({username : req.body.username});
//   User.register(newUser, req.body.password,function(err,user){
//       if(err){
//         console.log(err);
//         return res.render("register");
//       }
//       passport.authenticate("local")(req,res,function(){
//           res.redirect("/campgrounds");
//       });
//   });
// });

// //login routes

// app.get("/login",function(req,res){
//   res.render("login");
// });

// app.post("/login",passport.authenticate("local",{
//   successRedirect : "/campgrounds",
//   failureRedirect : "/login"
// }),function(req,res){

// });

// //logout
// app.get("/logout",function(req,res){
//   req.logout();
//   res.redirect("/");
// });

// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect("/login");
// }

app.listen(3000,function(){
	console.log(" Yelp camp has started!!!! ");
})