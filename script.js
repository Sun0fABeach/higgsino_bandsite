(function() {
'use strict';

$(document).ready(function() {
    hide_content_box();
});

$(window).on('load', function() {

    // initial fade-in of logo and backdrop + subsequent zoom animation
    display_logo();
    $('#background-pic').css('opacity', '1');
    $('#background').css('animation', 'zoom 700ms ease-in 9s');


    // click on logo: open content box, hide logo
    function open_content() {
        display_content_box();
        hide_logo();
    }
    $('#logo').one('click', open_content);

    // add scrollbars to content box only after opening transition completed
    $('main').on('transitionend', function(event) {
        if(event.propertyName === 'opacity' &&
            $(this).css('visibility') === 'visible')
                $(this).css('overflow', 'auto');
    });


    // on close: hide content box, show logo
    $('#close-target').click(function() {
        hide_content_box();
        display_logo();
        $('#logo').one('click', open_content);
    });


    // mute / unmute background track
    var mute_toggle_icons = {
        mute: 'fa fa-volume-up',
        unmute: 'fa fa-volume-off'
    };
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


/** helpers for animation - we are not using jQuery's animation handlers
 *  because they lack customization options (easing, delay)
 */
function display_content_box() {
    $('#background').css('animation', '');
    $('main').css('left', 0);
}

function hide_content_box() {
    $('main').css('left', '-' + $('main').outerWidth() + 'px')
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
