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