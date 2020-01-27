(function($) {
'use strict';

/* font-awesome icon classes */
var mute_toggle_icons = {
    mute: 'fa fa-volume-up',
    unmute: 'fa fa-volume-off'
};

$(document).ready(function() {
    hide_content_box();
    /* main is initially set invisible via css to avoid flash on page load */
    $('main').css('visibility', 'visible');

    $('.mute-toggle').click(toggle_background_track);

    $('#logo, #menu-icon').click(function open_content() {
        show_content_box('1s ease');
        hide_logo_and_icons();
        $('#sound-icon').off(); // prevent clickable hidden icon
    });

    $('#menu-close').click(function() {
        hide_content_box('1s ease');
        display_logo_and_icons();
        $('#sound-icon').click(toggle_background_track);
    });

    $('#toggle-imprint').one('click', function() {
        show_imprint();
    });
    $('#toggle-privacy').one('click', function() {
        show_privacy();
    });
});


/** launch initial fade-in of logo and backdrop + subsequent blur animation
 *  once all assets have been loaded. also decide if sound button is needed.
 */
$(window).on('load', function() {
    display_logo_and_icons();

    /* show mute icon if background track is being autoplayed. delay check
       to make it work on refresh for certain browsers. */
    setTimeout(function() {
        if(!get_player().paused)
            $('.mute-toggle').css('display', 'inline-block');
    }, 100);

    $('#background-pic').css('opacity', '0.8');
    $('#background').css('animation', 'blur 700ms ease-in 9s');
});


function toggle_background_track() {
    var $mute_icons = $('.mute-toggle').children('i');
    var player = get_player();
    if(player.muted) {
        player.muted = false;
        $mute_icons.removeClass().addClass(mute_toggle_icons.mute);
    } else {
        player.muted = true;
        $mute_icons.removeClass().addClass(mute_toggle_icons.unmute);
    }
}

function show_content_box(transition_behavior) {
    $('#background').css('animation', '');
    $('main').css({
        transition: 'transform ' + transition_behavior,
        transform: 'translateX(0)'
    });
}

function hide_content_box(transition_behavior, callback) {
    $('main').css({
        transition: transition_behavior ?
            'transform ' + transition_behavior : null,
        transform: 'translateX(-' + $('main').outerWidth() + 'px)'
    });
    if(callback) {
        $('main').on('transitionend', function(event) {
            if(event.target.nodeName.toLowerCase() === 'main') {
                $('main').off();
                callback();
            }
        });
    }
}

function display_logo_and_icons() {
    $('.hide-on-menu-open').css({
        opacity: '1',
        cursor: 'pointer'
    });
}

function hide_logo_and_icons() {
    // overwrite initial logo fade-in transition (make it faster):
    $('#logo').css('transition', 'opacity 0.5s linear');
    $('.hide-on-menu-open').css({
        opacity: '0',
        cursor: 'auto'
    });
}

function show_imprint() {
    hide_content_box('0.5s linear', function() {
        $('#toggle-privacy')
            .text('Privacy')
            .one('click', function() { show_privacy(); });
        $('#toggle-imprint')
            .text('Back')
            .one('click', function() { show_content(); });

        $('#content > section#general, section#privacy').css('display', 'none');
        $('#content > section#imprint').css('display', 'block');

        show_content_box('0.5s linear');
    });
}

function show_privacy() {
    hide_content_box('0.5s linear', function() {
        $('#toggle-imprint')
            .text('Imprint')
            .one('click', function() { show_imprint(); });
        $('#toggle-privacy')
            .text('Back')
            .one('click', function() { show_content(); });

        $('#content > section#general, section#imprint').css('display', 'none');
        $('#content > section#privacy').css('display', 'block');

        show_content_box('0.5s linear');
    });
}

function show_content() {
    hide_content_box('0.5s linear', function() {
        $('#toggle-imprint')
            .text('Imprint')
            .one('click', function() { show_imprint() });
        $('#toggle-privacy')
            .text('Privacy')
            .one('click', function() { show_privacy(); });

        $('#content > section#imprint, section#privacy').css('display', 'none');
        $('#content > section#general').css('display', 'block');

        show_content_box('0.5s linear');
    });
}

function get_player() {
    return $('audio').get(0);
}

})(jQuery);
