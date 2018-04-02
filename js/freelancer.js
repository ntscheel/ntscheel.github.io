// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    // Main variables
    var $aboutTitle = $('.about-myself .content h2');
    var $developmentWrapper = $('.development-wrapper');
    var developmentIsVisible = false;


    /* ####### HERO SECTION ####### */

    $(window).scroll( function(){

        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* ##### EXPERIENCE SECTION #### */

        // Check the location of each element hidden */
        $('.experience .content .hidden').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();

            /* If the object is completely visible in the window, fadeIn it */
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({
                    'opacity':'1',
                    'margin-left': '0'
                },600);
            }
        });

        /*###### SKILLS SECTION ######*/

        var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight()/2;

        if((bottom_of_window > middle_of_developmentWrapper)&& (developmentIsVisible == false)){

            $('.skills-bar-container li').each( function(){

                var $barContainer = $(this).find('.bar-container');
                var dataPercent = parseInt($barContainer.data('percent'));
                var elem = $(this).find('.progressbar');
                var width = 0;

                var id = setInterval(frame, 15);

                function frame() {
                    if (width >= dataPercent) {
                        clearInterval(id);
                    } else {
                        width++;
                        elem.css("width", width+"%");
                    }
                }
            });
            developmentIsVisible = true;
        }
    }); // -- End window scroll --

})(jQuery); // End of use strict

