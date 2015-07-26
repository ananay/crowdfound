$(document).ready(function(){
	$(window).load(function(){
		$(".title").css({
			'marginTop':50,
			'opacity':1
		});
		var srv = new Firebase("http://quizfork-server.firebaseio.com");
		var authData = srv.getAuth();
		if (authData){
			var userData = authData.twitter.cachedUserProfile;
			var pic = userData.profile_image_url_https;
			$("#login").html('<img width="100" height="100" src="'+pic+'" class="user_pic" align="absmiddle"></img><span class="user_name">'+userData.name+'<br /></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="" id="logout">Logout</a>');
		}
		$(document).on('click','#logout', function(){
			srv.unauth();
			$(this).fadeOut();
			authData = '';
		});
		$(window).scroll(function(){
			if ($(window).scrollTop() >= $(window).height()){
				$(".header").fadeIn();
			} else {
				$(".header").fadeOut();
			}
		});
		$("#login").click(function(){
			if (authData){
				window.location.href="dashboard.php";
			} else {
				srv.authWithOAuthPopup("twitter", function(error, data){
					if (error){
						alert("Error Signing In");
					} else {
						var userData = data.twitter.cachedUserProfile;
						var pic = userData.profile_image_url_https;
						$("#login").html('<img width="100" height="100" src="'+pic+'" class="user_pic" align="absmiddle"></img><span class="user_name">'+userData.name+'<br /></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="" id="logout">Logout</a>');
					}
				});
			}
		});	
	});
});