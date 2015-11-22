$( document ).ready(function() {
    $( "#menu-icon" ).click(function() {
	 	console.log("cliccato");
	 	
	 	if($( "#info" ).css('display')=='none'){
		 	$( "#info" ).show();
		 	$( "#info" ).css({right: '-100%', width: '90%', height: '80%', padding:'5%', paddingBottom:'20%'});							
			$( "#info" ).animate({
				right: 0
			}, 500, function() {});
			
			$( "#menu-icon" ).animate({
				backgroundColor: 'lime'
			}, 500, function() {});
	 	}else{
		 	
		 	$( "#info" ).animate({
				right: '-100%'
			}, 500, function() {
				$( "#info" ).hide();
			});
			
		 	
			
	 	}
	 	
	});    
});