$( document ).ready(function() {
    $( "#menu-icon" ).click(function() {
	 	console.log("cliccato");
	 	
	 	if($( "#info" ).css('display')=='none'){
		 	$( "#info" ).show();
		 	$( "#info" ).css({right: '-100%', width: '100%', height: '100%'});
			$( "#info" ).animate({
				right: 0
			}, 500, function() {});	

			$({deg: 0}).animate({deg: 45}, {
			    duration: 500,
			    step: function(now){
			        $( "#menu-icon" ).css({
			            transform: "rotate(" + now + "deg)"
			        });
			    },
			    complete: function() {
		 			$( "#menu-icon" ).css('background-image', 'url(assets/imgs/x.png)');
			    }
			});


	 	}else{		 	
		 	$( "#info" ).animate({
				right: '-100%'
			}, 500, function() {
				$( "#info" ).hide();
			});

			$({deg: 45}).animate({deg: 0}, {
			    duration: 500,
			    step: function(now){
			        $( "#menu-icon" ).css({
			            transform: "rotate(" + now + "deg)"
			        });
			    },
			    complete: function() {
		 			$( "#menu-icon" ).css('background-image', 'url(assets/imgs/plus.png)');
			    }
			});


	 	}
	 	
	});    
});