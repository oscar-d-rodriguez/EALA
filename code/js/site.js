
	jQuery(document).ready(function($) {

		    //$('#nav-main').scrollspy()
		    
		    // Localscrolling 
    		$('#nav-main, .brand').localScroll();
     		$(' .container').localScroll();

	});
	
	function resetTabs(){

        $("#content > div").hide(); //Hide all content

        $("#tabs a").attr("id",""); //Reset id's      

    }



    var myUrl = window.location.href; //get URL

    var myUrlTab = myUrl.substring(myUrl.indexOf("#")); // For localhost/tabs.html#tab2, myUrlTab = #tab2     

    var myUrlTabName = myUrlTab.substring(0,4); // For the above example, myUrlTabName = #tab



    (function(){

        $("#content > div").hide(); // Initially hide all content

        $("#tabs li:first a").attr("id","current"); // Activate first tab

        $("#content > div:first").fadeIn(); // Show first tab content

        

        $("#tabs a").on("click",function(e) {

            e.preventDefault();

            if ($(this).attr("id") == "current"){ //detection for current tab

             return       

            }

            else{             

            resetTabs();

            $(this).attr("id","current"); // Activate this

            $($(this).attr('name')).fadeIn(); // Show content for current tab

            }

        });



        for (i = 1; i <= $("#tabs li").length; i++) {

          if (myUrlTab == myUrlTabName + i) {

              resetTabs();

              $("a[name='"+myUrlTab+"']").attr("id","current"); // Activate url tab

              $(myUrlTab).fadeIn(); // Show url tab content        

          }

        }

    })()

    jQuery(document).ready(function ($) {
        $('.iosSlider').iosSlider({
            snapToChildren: true,
            navSlideSelector: '.sliderContainer .pager-slider .item',
            scrollbar: false,
            autoSlide: false,
            autoSlideTimer: 3300,
            onSlideChange: slideChange,
            responsiveSlideWidth: true,
            infiniteSlider: true,
            startAtSlide: '1'
        });
        $('.iosSlider .item:eq(0)').addClass("selected");
        $('.iosSlider').height($('.iosSlider .item:eq(0)')[0].scrollHeight);

        $(window).resize(function () {
            $('.iosSlider').height($('.iosSlider .item.selected')[0].scrollHeight);
            
        });
    });



    function slideChange(args) {
        $('.sliderContainer .pager-slider .item').removeClass('selected');
        $('.sliderContainer .pager-slider .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');

        $('.iosSlider .item').removeClass('selected');
        $('.iosSlider .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');

        $('.iosSlider').height("auto");
        $('.iosSlider').height($('.iosSlider .item:eq(' + (args.currentSlideNumber - 1) + ')')[0].scrollHeight);
    }



$(".rslides").responsiveSlides({

    speed: 500,

    timeout: 4000,

    });

   
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

/*!
 * jQuery plug-in to turn bootstrap tabbed navigation into responsive tabbed navigation
 * Original author: @stephen_thomas
 * Plugin Boilerplate: http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
 * Additional Boilerplate: http://f6design.com/journal/2012/05/06/a-jquery-plugin-boilerplate/
 * Comments from boilerplate sources retained
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {
  
    // undefined is used here as the undefined global 
    // variable in ECMAScript 3 and is mutable (i.e. it can 
    // be changed by someone else). undefined isn't really 
    // being passed in so we can ensure that its value is 
    // truly undefined. In ES5, undefined can no longer be 
    // modified.

    // window and document are passed through as local 
    // variables rather than as globals, because this (slightly) 
    // quickens the resolution process and can be more 
    // efficiently minified (especially when both are 
    // regularly referenced in your plugin).


    // From http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
    //
    // Strict Mode is a new feature in ECMAScript 5 that allows you to
    // place a program, or a function, in a "strict" operating context.
    // This strict context prevents certain actions from being taken
    // and throws more exceptions (generally providing the user with
    // more information and a tapered-down coding experience).
    //
    // Since ECMAScript 5 is backwards-compatible with ECMAScript 3,
    // all of the "features" that were in ECMAScript 3 that were
    // "deprecated" are just disabled (or throw errors) in strict
    // mode, instead.
    //
    // Strict mode helps out in a couple ways:
    //
    //  *  It catches some common coding bloopers, throwing exceptions.
    //  *  It prevents, or throws errors, when relatively "unsafe"
    //     actions are taken (such as gaining access to the global object).
    //  *  It disables features that are confusing or poorly thought out.
    
    "use strict";

    var pluginName = 'responsiveTabs';

    // The plug-in itself is implemented as an object. Here's the
    // constructor function

    function Plugin(element, options) {

        // Members
        var el = element,      // DOM version of element
           $el = $(element),   // jQuery version of element
           windowSize;         // last measured window size

        // Extend default options with those supplied by user.
        options = $.extend({}, $.fn[pluginName].defaults, options);
        
        // Slide the tab itself (not the content)
        function slideTab($tabEl, inOrOut, leftOrRight) {
          
            // grab the current values for styles we might change
            var oldStyles = {
                    "margin-left": $tabEl.css('margin-left'),
                    "opacity":     $tabEl.css('opacity'),
                    "position":    $tabEl.css('position')
                },
                startAnimation = {},
                endAnimation = {};
            
            // if the tab is going away, absolute position it so the
            // replacement tab will appear in its place
            if (inOrOut === 'out') {
                $tabEl.css('position', 'absolute');
                // define where the animation should end
                endAnimation["opacity"]     = 0;
                endAnimation["margin-left"] = $(window).width();
                if (leftOrRight === 'left') { endAnimation["margin-left"] *= -1; }

            // if the tab is coming into view, position it where it can
            // start its animation and set it up to fade in
            } else if (inOrOut === 'in') {
                startAnimation["opacity"]     = 0;
                startAnimation["margin-left"] = $(window).width();
                if (leftOrRight === 'left') { startAnimation["margin-left"] *= -1; }
                $tabEl.css(startAnimation);
                // ensure the tab will be visible as it moves in
                $tabEl.show();
                // end up with the modified styles restored
                endAnimation["opacity"]     = oldStyles["opacity"];
                endAnimation["margin-left"] = oldStyles["margin-left"];
            }

            // do the animation
            $tabEl.animate(
                endAnimation,
                options.slideTime,
                function() {

                    // if the tab has gone away, hide it in the conventional
                    // way and restore the properties that we animated
                    if (inOrOut === 'out') {
                        $tabEl.hide();
                        $tabEl.css(oldStyles);
                    }
                }
            );
       }
        
        // Set the small screen (responsive) style for tabbable naviation.
        function setSmallStyle() {

            $(".nav-tabs > li",$el).css("text-align", "center");
            $(".nav-tabs > li:not(.active)",$el).hide();
            $("<a class='right tab-control'>&rsaquo;</a>").appendTo($(".nav-tabs li:not(:last-child)",$el))
              .each(function(i){
                var thisLi  = $(this).parents("ul").first().children("li:nth-child("+(i+1)+")"),
                    thisTab = $(thisLi).children("a[href]"),
                    nextLi  = $(this).parents("ul").first().children("li:nth-child("+(i+2)+")"),
                    nextTab = $(nextLi).children("a[href]");
                $(this).click(function() {
                    slideTab(thisLi, "out", "left" );
                    slideTab(nextLi, "in",  "right");
                    $(nextTab).tab('show');
                });
            });
            $("<a class='left tab-control'>&lsaquo;</a>").prependTo($(".nav-tabs li:not(:first-child)",$el))
              .each(function(i){
                var thisLi = $(this).parents("ul").first().children("li:nth-child("+(i+2)+")"),
                    thisTab = $(thisLi).children("a[href]"),
                    prevLi = $(this).parents("ul").first().children("li:nth-child("+(i+1)+")"),
                    prevTab = $(prevLi).children("a[href]");
                $(this).click(function() {
                    slideTab(thisLi, "out", "right");
                    slideTab(prevLi, "in", "left");
                    $(prevTab).tab('show');
                });
            });
            $(".nav-tabs li:first-child",$el).prepend("<span class='left tab-control-spacer'> </span>");
            $(".nav-tabs li:last-child",$el).append("<span class='right tab-control-spacer'> </span>");
        }

        // Set the large screen version of tabbable navigation;
        // this is just the bootstrap default, so all we need to do is
        // to undo any potential changes we made for a small screen
        // style.
                
        function setLargeStyle() {
          
            $(".nav-tabs > li",$el).css("text-align", "left");
            $(".nav-tabs > li:not(.active)",$el).show();
            $(".tab-control",$el).remove();
            $(".tab-control-spacer",$el).remove();

        }
 
        function windowResized() {
          
            // Although this isn't strictly necessary, let's monitor the
            // window size so we can detect when it crosses the threshold
            // that triggers re-styling. Not likely a big deal for actual
            // users, but we include the functionality for the geeks that
            // like to look at responsive web sites and mess around with
            // browser window widths.
            //
            // We're not bothering with debouncing the window resize 
            // event since we only care when a breakpoint is crossed.
            // Ignoring the other resizes effectively serves as a
            // debouncer.
                        
            var newWidth = $('body').width();
            if ( (windowSize > options.maxSmallWidth) && 
                 (newWidth <= options.maxSmallWidth) )  {

                setSmallStyle();

            } else if ( (windowSize <= options.maxSmallWidth) && 
                        (newWidth > options.maxSmallWidth) ) {

                setLargeStyle();
                    
            }
            windowSize = newWidth;
        }

        // Initialize plugin.
        function init() {
            // keep track of the window size so we can tell when it crosses a breakpoint
            windowSize = $('body').width();
            
            // default is large window styling; adjust if appropriate
            if (windowSize <= options.maxSmallWidth) {
                setSmallStyle();
            }
            
            // track window size changes to look for breakpoints
            $(window).on('resize', windowResized);
            
            hook('onInit');

        }
 
        // Get/set a plugin option.
        // Get usage: $('#el').demoplugin('option', 'key');
        // Set usage: $('#el').demoplugin('option', 'key', value);
    
        function option (key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }
 
        // Destroy plugin.
        // Usage: $('#el').demoplugin('destroy');

        function destroy() {
            // Clean up by removing the event handlers we've added
            $(window).off('resize', windowResized);
            
            // restore styles and DOM
            setLargeStyle();
                
            // Iterate over each matching element.
            $el.each(function() {
                var el = this,
                   $el = $(this);
     
                hook('onDestroy');
                
                // Remove Plugin instance from the element.
                $el.removeData('plugin_' + pluginName);
            });
        }
 
        // Callback hooks.
        // Usage: In the defaults object specify a callback function:
        // hookName: function() {}
        // Then somewhere in the plugin trigger the callback:
        // hook('hookName');
    
        function hook(hookName) {
            if (options[hookName] !== undefined) {
                // Call the user defined function.
                // Scope is set to the jQuery element we are operating on.
                options[hookName].call(el);
            }
        }
 
        // Initialize the plugin instance.
        init();
 
        // Expose methods of Plugin we wish to be public.
        return {
            option: option,
            destroy: destroy
        };
    }
 
    // Build the plugin here 

    $.fn[pluginName] = function ( options ) {

        // If the first parameter is a string, treat this as a call to
        // a public method. The first parameter is the method name and
        // following parameters are arguments for the method.
  
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                // Check that the element has a plugin instance, and that
                // the requested public method exists.
                if ( $.data(this, 'plugin_' + pluginName) && 
                     typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function' ) {
                    // Call the method of the Plugin instance, and Pass it
                    // the supplied arguments.
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined){
                // If the method returned a value, return the value.
                return returnVal;
            } else {
                // Otherwise, returning 'this' preserves chainability.
                return this;
            }

        // If the first parameter is an object (options), or was omitted,
        // instantiate a new instance of the plugin.
  
        } else if (typeof options === "object" || !options) {

            return this.each(function() {
                // Only allow the plugin to be instantiated once.
                if (!$.data(this, 'plugin_' + pluginName)) {
                    // Pass options to Plugin constructor, and store Plugin
                    // instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    };
    
    // Default plugin options.
    // Options can be overwritten when initializing plugin, by
    // passing an object literal, or after initialization:
    // $('#el').responsiveTabs('option', 'key', value);
    $.fn[pluginName].defaults = {
        maxSmallWidth: 767,   // biggest screen size for which we use "small" configuration
        slideTime: 500,       // milliseconds to slide from one tab to another
        onInit: function() {},
        onDestroy: function() {}
    };

})( jQuery, window, document );


$(document).ready(function() {
    $(".tabbable.responsive").responsiveTabs();

    // Contact form

    $(".cform-form").validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        messages: {
            name: "You forgot to put your name",
            email: "That's not your real email",
            message: "Leave us a message"
        },
        errorPlacement: function(error,element) {
            element.attr("placeholder", error.text());
            console.log(element);
        },
        submitHandler: function(form) {
            var form = $(this).parents('form');
            var errorObj = form.find('.cform-response-output');
            showMessage(errorObj, 'Your message has been <br/>sent successfuly!');

            $.ajax({
                url: 'mailform.php',
                type: 'POST',
                data: { name: name, email: email, company: company, message: message, mailTo: mailTo },
                success: function (data, textStatus, xhr) {
                    form.find('input[type=text], textarea').val('');
                    showMessage(errorObj, 'Your message has been <br/>sent successfuly!');
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert('something bad ocurred' + textStatus + 'error' + errorThrown);
                    form.find('input[type=text], textarea').val('');
                    showMessage(errorObj, 'There was an error <br/>processing your request');
                }
            });
            
        }
    });

    
    function showMessage(errorObj, message){
             $('.cform-response-output').html(message).slideDown(200);
             setTimeout(function (e) {
                 $('.cform-response-output').slideUp(200);
            }, 3000);
        }

    //Google Maps


  $('.argentina #map_canvas').gmap3({
        map:{
            options:{
              center:[-33.655781,-59.095459],
              zoom: 6
            }
          },
          marker:{
            values:[
              {address:'Santa Fe 1173, Rosario, Santa Fe, Argentina S2000ATO', data:"<h3>Rosario Building</h3><p>Santa Fe 1173, Rosario, Santa Fe, Argentina S2000ATO</p><p>Tel: +(54341) 447 8300</p>"},
              {address:"Av Córdoba 2057, Capital Federal, Buenos Aires, Argentina C1120AAC", data:"<h3>Córdoba Building</h3><p>Av Córdoba 2057, Capital Federal, Buenos Aires, Argentina C1120AAC</p> <p>Tel: +(5411) 4705 6000 <br/>Fax: +(5411) 4705 6962</p>"},
              {address:'Diag. 80 942, La Plata, Buenos Aires, Argentina', data:"<h3>La Plata Building </h3><p>Diag. 80 942, La Plata, Buenos Aires, Argentina</p> <p>Tel: +(54221) 426 2000 <br/> Fax: +(54221) 426 2154 | 22000</p>"}
            ],
            cluster:{
                radius:100,
                // This style will be used for clusters with more than 0 markers
                  0: {
                    content: "<div class='cluster'>CLUSTER_COUNT</div>",
                    width: 53,
                    height: 52
                  },
            },
            options:{
              draggable: false,
              icon: 'img/icons/eala_marker.png'
            },
            events:{
              click: function(marker, event, context){
                var map = $(this).gmap3("get"),
                  infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.open(map, marker);
                  infowindow.setContent(context.data);
                } else {
                  $(this).gmap3({
                    infowindow:{
                      anchor:marker, 
                      options:{content: context.data}
                    }
                  });
                }
              }
            }
          }
    });
    $('.monterrey #map_canvas').gmap3({
        map:{
            options:{
              center:[25.701247,-100.379677],
              zoom: 6
            }
          },
          marker:{
            values:[
              {latLng:[25.669876,-100.377609], data:"<h3>Monterrey</h3><p>Blvd. Antonio L. Rodriguez 1884, Oficinas en el Parque Torre 1 -  Piso 5, Col. Santa Maria CP 64650, Monterrey, N.L. México</p></h3><p>Tel: +(52) 81 8048-0600 </p>"}
            ],
           
            options:{
              draggable: false,
              icon: 'img/icons/eala_marker.png'
            },
            events:{
              click: function(marker, event, context){
                var map = $(this).gmap3("get"),
                  infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.open(map, marker);
                  infowindow.setContent(context.data);
                } else {
                  $(this).gmap3({
                    infowindow:{
                      anchor:marker, 
                      options:{content: context.data}
                    }
                  });
                }
              }
            }
          }
    });
    
});
