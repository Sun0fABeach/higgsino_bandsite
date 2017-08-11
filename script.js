(function() {
'use strict';

/* font-awesome icon classes */
var mute_toggle_icons = {
    mute: 'fa fa-volume-up',
    unmute: 'fa fa-volume-off'
};


$(document).ready(function() {
    hide_content_box();

    $('.mute-toggle').click(toggle_background_track);

    $('#logo, #menu-icon').click(function open_content() {
        display_content_box();
        hide_logo_and_icons();
        $('#sound-icon').off(); // prevent clickable hidden icon
    });

    $('#menu-close').click(function() {
        hide_content_box();
        display_logo_and_icons();
        $('#sound-icon').click(toggle_background_track);
    });
});


/** launch initial fade-in of logo and backdrop + subsequent blur animation
 *  once all assets have been loaded.
 */
$(window).on('load', function() {
    display_logo_and_icons();
    $('#background-pic').css('opacity', '0.8');
    $('#background').css('animation', 'blur 700ms ease-in 9s');
});


function toggle_background_track() {
    var $mute_icons = $('.mute-toggle').children('i');
    var player = $('audio').get(0);
    if(player.muted) {
        player.muted = false;
        $mute_icons.removeClass().addClass(mute_toggle_icons.mute);
    } else {
        player.muted = true;
        $mute_icons.removeClass().addClass(mute_toggle_icons.unmute);
    }
}

function display_content_box() {
    $('#background').css('animation', '');
    $('main').css('left', 0);
}

function hide_content_box() {
    $('main').css('left', '-' + $('main').outerWidth() + 'px');
}

function display_logo_and_icons() {
    $('.hide-on-menu-open').css({
        opacity: '1',
        cursor: 'pointer'
    });
}

function hide_logo_and_icons() {
    $('#logo').css('transition', 'opacity 0.5s linear');
    $('.hide-on-menu-open').css({
        opacity: '0',
        cursor: 'auto'
    });
}

})();
