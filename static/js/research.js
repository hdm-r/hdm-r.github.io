var publications = document.getElementsByClassName('publication');
var pagination = document.getElementById('pagination');
var max_per_page = 9;

// initial page status: show page 1 with all publications
create_pagination_for(publications, max_per_page);
show_page_of(publications, 1, max_per_page);

// Create pagination for a *filtered* publication_list
function create_pagination_for(publication_list, show_per_page){

    // clear old pagination
    for (let i = pagination.children.length - 2; i > 1; i--){
        pagination.children[i].remove();
    }

    // create new pagination
    var num_publications = publication_list.length;

    for (let i = 2; i < (num_publications / show_per_page) + 1; i++){
        var a = document.createElement('a');
        a.appendChild(document.createTextNode(i));
        a.href = "#publications";
        pagination.insertBefore(a, pagination.children[i]);
    }

    // register onclick events
    pagination.children[0].onclick = function(){
        prev_page(publication_list, show_per_page);
    };
    for (let i = 1; i < pagination.children.length - 1; i++){
        pagination.children[i].onclick = function(){
            //console.log('page', i);
            show_page_of(publication_list, i, show_per_page);
        };
    }
    pagination.children[pagination.children.length - 1].onclick = function(){
        next_page (publication_list, show_per_page, pagination.children.length - 2);
    };
}

function update_pagination_visibility(){

    for (let page of pagination.children){ page.style.display = 'none'; }
    // Always show the first and last two elements
    pagination.children[0].style.display = 'inline';
    pagination.children[1].style.display = 'inline';
    pagination.children[pagination.children.length - 1].style.display = 'inline';
    pagination.children[pagination.children.length - 2].style.display = 'inline';

    var current_page = Number(pagination.querySelector('.active').textContent);

    // make +/-3 elements visible based on the current page
    var start = current_page - 3;
    if (start < 1){ start = 1;}
    var stop  = current_page + 3;
    if (stop > pagination.children.length - 2){ stop = pagination.children.length - 2;}

    // handle the events where the left/right of the current page is not *balanced*
    if ((pagination.children.length - 2) >= 9){
        var extra_on_right_side = 0;
        if (current_page <= 4) {
            extra_on_right_side = 4 - (current_page - 1);
        }
        var extra_on_left_side = 0;
        if (current_page >= pagination.children.length - 2 - 4){
            extra_on_left_side = 4 - ((pagination.children.length - 2) - (current_page)); 
        }
        start -= extra_on_left_side;
        stop += extra_on_right_side;
    }
    for (let i = start; i <= stop; i++){
        pagination.children[i].style.display = 'inline';
    }
}

function prev_page (publication_list, show_per_page){

    var current_page = Number(pagination.querySelector('.active').textContent);
    var prev_page = current_page - 1;
    if (prev_page < 1) { prev_page = 1; }
    //console.log('prev:', current_page, '->', prev_page);
    show_page_of(publication_list, prev_page, show_per_page);

}
function next_page (publication_list, show_per_page, num_pages){

    var current_page = Number(pagination.querySelector('.active').textContent);
    var next_page = current_page + 1;
    if (next_page > num_pages) { next_page = num_pages; }
    //console.log('next', current_page, '->', next_page, num_pages);
    show_page_of(publication_list, next_page, show_per_page);
}

function show_page_of(publication_list, page, show_per_page) {

    // hide all publications
    for (let e of publications){ e.style.display ='none'; };

    // show publications of page x
    var start = (page * show_per_page) - show_per_page;
    var stop  = (page * show_per_page);
    if (stop > publication_list.length){ stop = publication_list.length};

    for (let i = start; i < stop; i++) {
        publication_list[i].style.display ='block';
    }
    // update pagination active status
    for (let page of pagination.children){ page.classList.remove('active'); }
    pagination.children[page].classList.add('active');

    update_pagination_visibility();
}

function filter(filter_button){

    var pub_filter = document.getElementById('pub_filter');

    if (filter_button === 'clear'){
        var all_filter = pub_filter.querySelectorAll('button');
        for (let filter of all_filter){ filter.classList.remove('active'); }
        var filtered_pubs = publications;
    }else{

        filter_button.classList.toggle('active');

        var all_active_filter = pub_filter.querySelectorAll('.active');
        if (all_active_filter.length == 0){
            var filtered_pubs = publications;
        }else{
            var class_selectors = [];
            for (let filter of all_active_filter){
                class_selectors.push('.y_' + filter.textContent);
            }
        var pub_list = document.getElementById('pub_list');
        var filtered_pubs = pub_list.querySelectorAll(class_selectors);
        }
    }
    create_pagination_for(filtered_pubs, max_per_page);
    show_page_of(filtered_pubs, 1, max_per_page);
}
