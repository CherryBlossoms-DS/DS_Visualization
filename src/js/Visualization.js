$('document').ready(() => {
    $('.vis-img').on({
        mouseenter: function() {
            $(this).attr("src", $(this).attr("src").split('png')[0] + "gif");
        },
        mouseout: function() {
            $(this).attr("src", $(this).attr("src").split('gif')[0] + "png");
        }
    });
});

function print_vis_list(print_list) {
    if(print_list.length == 0) {
        return '';
    }

    let idx = 0;
    let innerHTML = ""

    while (idx < print_list.length) {
        innerHTML += '<div class="row vis-warp">';

        for (let i = 0; i < 3; i++) {
            console.log(idx);
            innerHTML +=
                '<div class="vis-container">' +
                    '<a href="' + print_list[idx].url + '">' +
                        '<img src="' + print_list[idx].imgPath + '" class="img-rounded vis-img" alt="정렬">' +
                    '</a>' +
                    '<p>' + print_list[idx].name + '</p>' +
                    '<tag>';
                        for (let j = 0; j < print_list[idx].tag.length; j++) {
                            innerHTML +=
                                '<button>' +
                                    print_list[idx].tag[j] +
                                '</button>'
                            ;
                        }
            innerHTML +=
                    '</tag>' +
                '</div>'
            ;

            idx++;

            if (idx >= print_list.length) {
                break;
            }
        }

        innerHTML += '</div>';
    }

    return innerHTML;
}

$("#search_input").keyup(() => {
    let print_list = [];
    let top = 0;
    let search_str = $('#search_input').val();

    if (search_str != '') {
        for (let i = 0; i < vis_list.length; i++) {
            if (vis_list[i].name.indexOf(search_str) != -1) {
                print_list[top++] = vis_list[i];
            }
            else {
                for (let j = 0; j < vis_list[i].tag.length; j++) {
                    if (vis_list[i].tag[j].indexOf(search_str) != -1) {
                        print_list[top++] = vis_list[i];
                    }
                }
            }
        }
    
        document.getElementById('vis-list').innerHTML = print_vis_list(print_list);
    }
    else {
        document.getElementById('vis-list').innerHTML = print_vis_list(vis_list);
    }
})


$(document).ready(
    document.getElementById('vis-list').innerHTML = print_vis_list(vis_list)
)