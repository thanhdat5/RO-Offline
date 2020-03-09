var WRAP_WIDTH = 1360;
var WRAP_HEIGHT = 768;
$(function() {
    doResize();
});

window.addEventListener("resize", function(event) {
    doResize()
});

function doResize() {
    var WINDOW_WIDTH = $(window).width();
    var WINDOW_HEIGHT = $(window).height();
    var scalePercent2 = WINDOW_HEIGHT / (WRAP_HEIGHT + 80);
    if (!$("#menuButton").html()) {
        scalePercent = WINDOW_WIDTH / 1240;
    }
    $("#wrapx").css("transform", "scale(" + scalePercent2 + ") /*translateY(" + (scalePercent2 * 100) + "px)*/");
    $("#wrapx").css("transform-origin", "center top");
}

function dragFix(event, ui) {
    var WINDOW_HEIGHT = $(window).height();
    var scalePercent2 = WINDOW_HEIGHT / (WRAP_HEIGHT + 80);
    ui.position.left = ui.position.left / scalePercent2;
    ui.position.top = ui.position.top / scalePercent2;
}