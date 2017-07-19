(function() {
'use strict';

$(window).on('load', function() {

    // initial fade-in of logo and backdrop
    display_logo();
    $('#background-pic').css('opacity', '1');


    // launch animations of the backdrop
    function next_animation() {
        $('#background').css('animation', rotate_animation());
    }
    next_animation();
    $('#background').on('animationend', next_animation);


    // click on logo: open content box, hide logo and deactivate animations
    function open_content_box() {
        display_content_box();
        hide_logo();
        $('#background').css('animation', '');
    }
    $('#logo').one('click', open_content_box);

    // add scrollbars to content box only after opening transition completed
    $('main').on('transitionend', function(event) {
        if(event.propertyName === 'opacity' &&
            $(this).css('visibility') === 'visible')
                $(this).css('overflow', 'auto');
    });


    // on close: hide content box, show logo, reactivate animations
    $('#close-target').click(function() {
        hide_content_box();
        display_logo();
        $('#logo').one('click', open_content_box);
        next_animation();
        $('#background').on('animationend', next_animation);
    });


    // mute / unmute background track
    var mute_toggle_icons = {
        mute: 'fa fa-volume-up',
        unmute: 'fa fa-volume-off'
    };
    $('#mute-toggle').click(function() {
        var mute_icon = $(this).children('i');
        var player = $('audio').get(0);
        if(player.muted) {
            player.muted = false;
            mute_icon.removeClass().addClass(mute_toggle_icons.mute);
        } else {
            player.muted = true;
            mute_icon.removeClass().addClass(mute_toggle_icons.unmute);
        }
    });
});


var animations = [
    'zoom 700ms ease-in 9s',
    // 'psycho 700ms linear 5s',
    'bright 0.6s linear 7s'
];
function rotate_animation() {
    var anim = animations.shift();
    animations.push(anim);
    return anim;
}

function display_content_box() {
    $('main').css({
        visibility: 'visible',
        maxWidth: '80%',
        maxHeight: '90%'
    }).children('#content-wrapper').css(
        'opacity', '1'
    );
}

function hide_content_box() {
    $('main').css({
        overflow: 'hidden',
        visibility: 'hidden',
        maxWidth: '0',
        maxHeight: '0'
    }).children('#content-wrapper').css(
        'opacity', '0'
    );
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
