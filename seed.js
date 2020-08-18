var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [{
	name:"Mountain Hill", 
	image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	description : "Idaho's 30 state parks offer something for everyone. We invite you to explore the diversity and beauty of our state park system from our endless trails to magnificent lake-side retreats, wide-open country sides and breathtaking mountain views. Experience nature in Idaho, sleep under the stars, view wildlife, climb the rocks, reel in a winning catch, enjoy a picnic, learn something new about yourself and make lifelong memories with your family. Discover Idaho's State Parks for yourself. Come stay and play. We've even saved a campsite for you."
     },
 {
 	name:"Make my Trip", 
 	image: "https://images.unsplash.com/photo-1517217451453-818405428795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
 	description : "Illinois offers a diverse landscape rich in natural resources and abundant recreational opportunities. Many unique and beautiful places await you in the Prairie State. From Adeline Jay Geo-Karis Illinois Beach State Park on the Lake Michigan shore, to the spectacular overlooks of Starved Rock State Park, to the massive sandstone structures of Giant City State Park and world-renowned wetlands of the southernmost part of the state, Illinois has much to offer as a destination for camping, fishing, hunting, wildlife watching, boating, hiking, picnics, bicycling and horseback riding."
 },
{
	name:"Campers", 
    image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description : "Welcome to Nebraska's state park system. From Chadron, our first park established in 1921, Nebraska's park system now encompasses 86 areas across the state. There are park lands to suit virtually every outdoor taste.Whether you're seeking the ultimate in modern conveniences in a picturesque outdoor setting or yearn to get back to nature amid the unspoiled beauty of the wilderness, you can find just the right locale for you from among Nebraska's exceptional state park area...from magnificent Eugene T. Mahoney State Park in the east to the rugged beauty of Fort Robinson State Park in the west.At our staffed areas, you'll find a dedicated corps of hospitable folks ready to make your stay an enjoyable and memorable experience. Enjoy your visit with us and come back again soon."
}
];


function seedDb(){

   // Campground.remove({},function(err){
   // 	if(err) console.log(err);
   // 	else {
   // 		console.log("removed campgrounds");
   // 		data.forEach(function(seed){
   // 			Campground.create(seed,function(err,campground){
   // 					if(err) console.log(err);
   // 					else {
   // 						console.log("Added campground");
   // 						Comment.create({
   // 							text:"Montana State park visitors will find exceptional wildlife viewing, spectacular scenery, lakes and streams for angling and water sports, opportunities to learn about western history, and sites to appreciate the geological wonders of the state.",
   // 							author : "Campers"
   // 						},function(err,comment){
   // 							if(err) console.log(err);
   // 							else {
   // 								campground.comments.push(comment);
   // 								campground.save(function(err,saved){
   // 									if(err) 
   // 										console.log(err);
   // 									else {
   // 										console.log(saved);
   // 										console.log("Added comments");
   // 									}
   // 								});
   // 							}
   // 						});
   // 					}
   // 			});
   // 		});
   // 	}
   // });

}

module.exports = seedDb;