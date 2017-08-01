(function() {
'use strict';

/* font-awesome icon classes */
var mute_toggle_icons = {
    mute: 'fa fa-volume-up',
    unmute: 'fa fa-volume-off'
};


$(document).ready(function() {
    hide_content_box();

    // click on logo: open content box, hide logo
    $('#logo').one('click', open_content);

    // on close: hide content box, show logo
    $('#close-target').click(function() {
        hide_content_box();
        display_logo();
        $('#logo').one('click', open_content);
    });

    // mute / unmute background track
    $('#mute-toggle').click(function() {
        var $mute_icon = $(this).children('i');
        var player = $('audio').get(0);
        if(player.muted) {
            player.muted = false;
            $mute_icon.removeClass().addClass(mute_toggle_icons.mute);
        } else {
            player.muted = true;
            $mute_icon.removeClass().addClass(mute_toggle_icons.unmute);
        }
    });
});


/** launch initial fade-in of logo and backdrop + subsequent zoom animation
 *  once all assets have been loaded.
 */
$(window).on('load', function() {
    display_logo();
    $('#background-pic').css('opacity', '1');
    $('#background').css('animation', 'zoom 700ms ease-in 9s');

});


/** helpers for animation - we are not using jQuery's animation handlers
 *  because they lack customization options (easing, delay)
 */
 function open_content() {
     display_content_box();
     hide_logo();
 }

function display_content_box() {
    $('#background').css('animation', '');
    $('main').css('left', 0);
}

function hide_content_box() {
    $('main').css('left', '-' + $('main').outerWidth() + 'px');
}

function display_logo() {
    $('#logo').css({
        opacity: '1',
        cursor: 'pointer'
    });
}

function hide_logo() {
    $('#logo').css({
        transition: 'opacity 0.5s linear',
        opacity: '0',
        cursor: 'auto'
    });
}

})();
