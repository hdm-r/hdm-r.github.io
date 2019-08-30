var feature_news = document.getElementById('featured_news');
var slide_pages  = feature_news.querySelectorAll(".slide-page");
var dots         = feature_news.querySelectorAll(".dot");
var index = 1;

// initial state
showSlide(index);

function plusSlide(n){
    index += n;
    if (index > dots.length){ index = 1; }
    if (index < 1){ index = dots.length; }
    showSlide(index)
}
function showSlide(n) {
    // clear everything
    for (let page of slide_pages){ page.style.display = 'none'; }
    for (let dot of dots){ dot.classList.remove('active'); }

    // show the desired page
    dots[n - 1].classList.add('active');
    slide_pages[n - 1].style.display = 'flex';
    index = n;
}
