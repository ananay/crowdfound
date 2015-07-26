$(document).ready(function(){
	var srv = new Firebase("http://quizfork-server.firebaseio.com");
	var authData = srv.getAuth();
	if (authData){
		var userData = authData.twitter.cachedUserProfile;
		var pic = userData.profile_image_url_https;
		$("#login").html('<img width="100" height="100" src="'+pic+'" class="user_pic" align="absmiddle"></img><span class="user_name">'+userData.name+'<br /></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="" id="logout">Logout</a>');
	}
    Parse.initialize("e9xwauybyOdn6Bv4WvDoVvubHW2I6doSzV7Cd9wa", "r0IwC7zAiETyKHUmMRi8wGxyqkd3lNilUuTSnkSq");
    
    var TestObject = Parse.Object.extend("items");
    //var testObject = new TestObject();

    var query = new Parse.Query(TestObject);

   // var dfd = new jQuery.Deferred();

    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
            // alert("Successfully retrieved " + results.length + " scores.");
            //var defaultLocation = results[0].get("Location");
            var iskiLocation = results[i].get("Location");

            //var distance = Parse.kilometersTo(iskiLocation)

            var found = results[i].get("status");
            var imageToDisplay = found ? "assets/tick.png" : "assets/cross.png";
           // var stringToDisplay = found ? "Safely at home" : "Last seen ";

            $.ajax({
                type: 'GET',
                url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+iskiLocation.latitude+","+iskiLocation.longitude,
                dataType: 'json',
                success: function(e) { //console.log(e);
                    if (e.status=="OK"){
                        var address = e.results[0].formatted_address;
                    }
                    else{
                        var address = "Your "+results[i].get("name")+" is in the middle of nowhere! :("
                    }
                    function changeImage(element) {
                        element.src = element.bln ? "assets/tick.png" : "assets/cross.png";
                        element.bln = !element.bln;
                    }
                    
                    //console.log(address);
                var myRow="<tr><td><a>"+results[i].get("name")+"</a></td><td><img src="+imageToDisplay+" id=\"changer\" onclick=\"changeImage(this)\" /></td><td><a href=\"https://www.google.com/maps/search/"+iskiLocation.latitude+","+iskiLocation.longitude+"/\">"+address+"</a></td></tr>";
                    console.log(myRow);

                    $(".out").html($(".out").html()+myRow);
                    //console.log(changer);
                    // changer.onclick = function() {
                    //     console.log("Click action done!");
                    // }

                },
                data: {},
                async: false
            });
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
});