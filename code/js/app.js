

		
	// Code to hide address bar

	
	jQuery(document).ready(function($) {
	
		/** Main Menu animation **/

		
        if (!Modernizr.touch ) {
            // Allow hover events if touch enabled
           $('#main-menu li').hover(function() {
			var dc= $(this).attr('data-dc');
			$('#stage .slider').cycle(dc-1);
				$(this).animate({
					'height': '186px',
					'border-width': '60px',
				}, 300, 'easeInOutQuad');

		    }, function() {
			
				    $(this).animate({
					    'height': '240px',
					    'border-width': '7px',
				    }, 300, 'easeInOutQuad');

		    });
        }else{
            // Hide address bar if touch is enabled
            window.addEventListener("load",function() {
		        // Set a timeout...
		        setTimeout(function(){
			        // Hide the address bar!
			        window.scrollTo(0, 1);
		        }, 0);
	        });
        }
	 
		
		
		

		
		$('#stage .slider').cycle({
			slideResize: true,
			containerResize: true,
			width: '100%',
			height: '100%',
			fit: 1
		});
		
	});

	

