// direct urls, i.e. from home/people
document.addEventListener("DOMContentLoaded", function() {
    toggle_info_card(window.location.hash.substr(1));
});

// url changes from within the about page
window.addEventListener('hashchange', function() {
    toggle_info_card(window.location.hash.substr(1));
});

function toggle_info_card(id) {

    // hide all info cards
    var info_cards = document.getElementsByClassName('info_card');
    for (let card of info_cards){ card.style.display ='none'; };

    // make the "one" card visible
    var show_me = document.getElementById(id);
    show_me.style.display = 'flex';

    // scroll to the "one" card
    show_me.scrollIntoView(true);
}