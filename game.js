let solved = false;
let pieces = []
var activePiece;


$(document).ready(function() {
    // add method to set challenge icons from here, received from ejs

    pieces = $('.piece').toArray()

    $('.piece').each(function() {
        $(this).data('angle', 0)
    })
    $('[data-toggle="tooltip"]').tooltip();
    $(".board").click(function() {
        $(activePiece).appendTo($(this));
        checkSolved();
    });
    $(".piece").click(function() {
        if (activePiece == this) {
            $(this).data('angle', ($(this).data('angle') + 1) % 4)
            $(this).css({
                'transform': 'rotate(' + $(this).data('angle') * 90 + 'deg)'
            });
        } else {
            $(activePiece).removeClass("active");
            $(this).addClass("active");
            activePiece = this;
        }
    });
    $(".piece-place").click(function() {
        $(activePiece).appendTo($(this));
    });
    // setInterval(, 100)
});

function reset() {
    pieces.forEach((e, i) => {
        $("#" + e.id + ".piece").appendTo($(".piece-place").get(i));
        $("#" + e.id + ".piece").data("angle", 0)
        $("#" + e.id + ".piece").css({
            'transform': 'rotate(' + $("#" + e.id + ".piece").data('angle') * 90 + 'deg)'
        });
    })
    $(activePiece).removeClass("active");
    activePiece = undefined;
    $("#win").css("display", "none");
    $(".overlay").css("width", "0");
}

function checkSolved() {
    if (solved) return;

    let flag = true;
    pieces.forEach((e, i) => {
        if (($("#" + e.id + ".piece").data("angle") == ang[i]) &&
            (parseInt($("#" + e.id + ".piece").parent().attr('id')) == pos[parseInt($("#" + e.id + ".piece").attr('id'))])) {
            return;
        } else if ((i == 3) &&
            ($("#3.piece").data("angle") == ang[3] || $("#3.piece").data("angle") == (ang[3] + 2) % 4) &&
            (parseInt($("#3.piece").parent().attr('id')) == pos[parseInt($("#3.piece").attr('id'))])) {
            return;
        } else {
            flag = false;
        }
    });
    if (flag) {
        $("#win").css("display", "block");
        $(".overlay").css("width", "100%");
        win();
        /* turn the timer off */
    }
}

function win() {
    pause();
    var timeString = "";
    var t = "";
    var zero = "";
    var minutes = (totalSeconds / 60);
    var seconds = (totalSeconds % 60);
    if (seconds < 10 & minutes >= 1) {
        zero = " 0";
    } else {
        zero = "";
    }
    if (minutes >= 1) {
        timeString = " minutes ";
        t = " : ";
    } else {
        timeString = " seconds ";
        t = "";
    }
    if(minutes >= 1){
        $("#winingTime").text(Math.trunc(minutes) + t + zero + Math.trunc(seconds) + timeString);
    }else{
        $("#winingTime").text(t + zero + Math.trunc(seconds) + timeString);
    }

    if(totalSeconds < 1000){
        $("#score").text(Number((1000 - totalSeconds).toFixed(0)));
    }else{
        $("#score").text(Number((10).toFixed(0)));
    }

}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}