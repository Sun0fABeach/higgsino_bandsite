(function() {
'use strict';

window.addEventListener('load', function() {
    // initial fade-in of logo and backdrop
    var logo = document.querySelector('#logo');
    do_initial_fade_in(logo, document.querySelector('#background-pic'));

    // launch animations of the backdrop
    var background = document.querySelector('#background');
    function next_animation() {
        background.style.animation = rotate_animation();
    }
    next_animation();
    background.addEventListener('animationend', next_animation);

    // mute / unmute background track
    var mute_toggle = document.querySelector('#mute-toggle');
    mute_toggle.addEventListener('click', function() {
        toggle_mute(mute_toggle.firstElementChild);
    });

    // click on logo: open content box, hide logo and deactivate animations
    var content_box = document.querySelector('main');
    var content_wrapper = content_box.firstElementChild;
    function open_content_box() {
        display_content_box(content_box, content_wrapper);
        hide_logo(logo);
        logo.removeEventListener('click', open_content_box);
        background.style.animation = null;
    }
    logo.addEventListener('click', open_content_box);

    // add scrollbars to content box only after opening transition completed
    content_box.addEventListener('transitionend', function(event) {
        if(event.propertyName === 'opacity' &&
            content_box.style.visibility === 'visible')
                content_box.style.overflow = 'auto';
    });

    // on close: hide content box, show logo, reactivate animations
    var close_target = document.querySelector('#close-target');
    close_target.addEventListener('click', function() {
        hide_content_box(content_box, content_wrapper);
        display_logo(logo);
        logo.addEventListener('click', open_content_box);
        next_animation();
        background.addEventListener('animationend', next_animation);
    });
});


function do_initial_fade_in(logo, background_pic) {
    logo.style.opacity = 1;
    background_pic.style.opacity = 1;
}

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

var mute_toggle_icons = {
    mute: 'fa fa-volume-up',
    unmute: 'fa fa-volume-off'
};
function toggle_mute(mute_icon) {
    var player = document.querySelector('audio');
    if(player.muted) {
        player.muted = false;
        mute_icon.className = mute_toggle_icons.mute;
    } else {
        player.muted = true;
        mute_icon.className = mute_toggle_icons.unmute;
    }
}

function display_content_box(content_box, content_wrapper) {
    content_box.style.visibility = 'visible';
    content_box.style.maxWidth = '80%';
    content_box.style.maxHeight = '90%';
    content_wrapper.style.opacity = 1;
}

function hide_content_box(content_box, content_wrapper) {
    content_box.style.overflow = 'hidden';
    content_box.style.visibility = 'hidden';
    content_box.style.maxWidth = 0;
    content_box.style.maxHeight = 0;
    content_wrapper.style.opacity = 0;
}

function display_logo(logo) {
    logo.style.opacity = 1;
    logo.style.cursor = 'pointer';
}

function hide_logo(logo) {
    logo.style.transition = 'opacity 0.5s linear';
    logo.style.opacity = 0;
    logo.style.cursor = 'auto';
}

})();
