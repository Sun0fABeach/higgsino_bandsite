(function($) {
'use strict';

/* font-awesome icon classes */
var mute_toggle_icons = {
    mute: 'fa fa-volume-up',
    unmute: 'fa fa-volume-off'
};

var transitions = {
    side_pane_toggle: 'transform 1s ease',
    side_pane_switch: 'transform 0.5s linear',
    fast_logo_fade_in: 'opacity 0.5s linear'
};

var side_pane_open = false;

var ui = {};

$(document).ready(function() {
    init_ui_elements();
    init_event_handlers();

    display_logo_and_icons();

    ui.$background_pic.css('opacity', '0.8');
    ui.$background.css('animation', 'blur 700ms ease-in 9s');

    /* show mute icon if background track is being autoplayed. delay check
       to make it work on refresh for certain browsers. */
    setTimeout(function() {
        if(!get_player().paused) {
            ui.$mute_toggles.css('display', 'inline-block');
        }
    }, 100);
});


function init_ui_elements() {
    ui.$background = $('#background');
    ui.$background_pic = $('#background-pic');
    ui.$logo = $('#logo');
    ui.$side_pane = $('main');
    ui.$audio = $('audio');
    ui.$mute_toggles = $('.mute-toggle');
    ui.$background_sound_icon = $('#sound-icon');
    ui.$menu_openers = $('#logo, #menu-icon');
    ui.$menu_close = $('#menu-close');
    ui.$toggle_imprint = $('#toggle-imprint');
    ui.$toggle_privacy = $('#toggle-privacy');
    ui.$hide_on_menu_open = $('.hide-on-menu-open');
    ui.$section_general = $('#content > section#general');
    ui.$section_imprint = $('#content > section#imprint');
    ui.$section_privacy = $('#content > section#privacy');
}

function init_event_handlers() {
    ui.$mute_toggles.click(toggle_background_track);

    ui.$menu_openers.click(function open_content() {
        show_side_pane(transitions.side_pane_toggle);
        hide_logo_and_icons();
        ui.$background_sound_icon.off(); // prevent clickable hidden icon
    });

    ui.$menu_close.click(function() {
        hide_side_pane(transitions.side_pane_toggle);
        display_logo_and_icons();
        ui.$background_sound_icon.click(toggle_background_track);
    });

    ui.$toggle_imprint.one('click', function() {
        switch_to_imprint();
    });
    ui.$toggle_privacy.one('click', function() {
        switch_to_privacy();
    });

    $(window).on('resize', function() {
        if(side_pane_open) {
            adjust_open_side_pane();
        }
    });
};

function toggle_background_track() {
    var $mute_icons = ui.$mute_toggles.children('i');
    var player = get_player();
    if(player.muted) {
        player.muted = false;
        $mute_icons.removeClass().addClass(mute_toggle_icons.mute);
    } else {
        player.muted = true;
        $mute_icons.removeClass().addClass(mute_toggle_icons.unmute);
    }
}

function display_logo_and_icons() {
    ui.$hide_on_menu_open.css({
        opacity: '1',
        cursor: 'pointer'
    });
}

function hide_logo_and_icons() {
    // overwrite initial logo fade-in transition (make it faster):
    ui.$logo.css('transition', transitions.fast_logo_fade_in);
    ui.$hide_on_menu_open.css({
        opacity: '0',
        cursor: 'auto'
    });
}

function show_side_pane(transition_behavior) {
    ui.$background.css('animation', ''); // cancel blur
    ui.$side_pane.css({
        transition: transition_behavior,
        transform: 'translateX(' + ui.$side_pane.outerWidth() + 'px)'
    });
    side_pane_open = true;
}

function hide_side_pane(transition_behavior, callback) {
    ui.$side_pane.css({
        transition: transition_behavior,
        transform: 'translateX(0)'
    });
    if(callback) {
        ui.$side_pane.on('transitionend', function(event) {
            if(event.target.nodeName.toLowerCase() === 'main') {
                ui.$side_pane.off();
                callback();
            }
        });
    }
    side_pane_open = false;
}

function adjust_open_side_pane() {
    ui.$side_pane.css({
        transition: 'unset',
        transform: 'translateX(' + ui.$side_pane.outerWidth() + 'px)'
    });
}

function switch_to_imprint() {
    hide_side_pane(transitions.side_pane_switch, function() {
        ui.$toggle_privacy
            .text('Privacy')
            .one('click', function() { switch_to_privacy(); });
        ui.$toggle_imprint
            .text('Back')
            .one('click', function() { switch_to_content(); });

        ui.$section_general.add(ui.$section_privacy).css('display', 'none');
        ui.$section_imprint.css('display', 'block');

        show_side_pane(transitions.side_pane_switch);
    });
}

function switch_to_privacy() {
    hide_side_pane(transitions.side_pane_switch, function() {
        ui.$toggle_imprint
            .text('Imprint')
            .one('click', function() { switch_to_imprint(); });
        ui.$toggle_privacy
            .text('Back')
            .one('click', function() { switch_to_content(); });

        ui.$section_general.add(ui.$section_imprint).css('display', 'none');
        ui.$section_privacy.css('display', 'block');

        show_side_pane(transitions.side_pane_switch);
    });
}

function switch_to_content() {
    hide_side_pane(transitions.side_pane_switch, function() {
        ui.$toggle_imprint
            .text('Imprint')
            .one('click', function() { switch_to_imprint() });
        ui.$toggle_privacy
            .text('Privacy')
            .one('click', function() { switch_to_privacy(); });

        ui.$section_imprint.add(ui.$section_privacy).css('display', 'none');
        ui.$section_general.css('display', 'block');

        show_side_pane(transitions.side_pane_switch);
    });
}

function get_player() {
    return ui.$audio.get(0);
}

})(jQuery);
