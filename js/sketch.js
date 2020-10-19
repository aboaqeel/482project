class level {
    constructor() {
        this.level
    }
    solve() {

    }
}

let d1, d2, d3, d4;
let pieces, activePiece, piecePlaces, boardPieces;
let solution = [
    [0, 3, 2, 1],
    [1, 2, 1, 1]
];
let solved = false;

function setup() {
    r = 217;
    g = 180;
    b = 140;
    colorMode(HSB);
    frameRate(5);
    // 217, 180, 140

    // background(r,g,b);

    let cnvs = createCanvas(windowWidth, windowHeight)

    cnvs.mousePressed(() => {
        if (activePiece != undefined) {
            activePiece.removeClass("selected");
            activePiece = undefined;
        }

    })

    d1 = select("#d1");
    d2 = select("#d2");
    d3 = select("#d3");
    d4 = select("#d4");
    pieces = selectAll(".piece");
    piecePlaces = selectAll(".piece-place");
    boardPieces = [d1, d2, d3, d4]

    activePiece = undefined;

    // check for placing selected piece and drop shadow on hover
    boardPieces.forEach((el) => {
        el.mouseOver(() => {
            el.style("filter", "drop-shadow(0 0 2.5em #1d1914)")
        })
        el.mouseOut(() => {
            el.style("filter", "")
        })
        el.mousePressed(() => {
            if (activePiece != undefined) {
                if (el.child().length < 4) {
                    activePiece.parent(el)
                } else {
                    activePiece.removeClass("selected");
                    arr = [].slice.call(el.child());
                    arr.forEach((el) => {
                        if (el.toString().includes("HTMLImageElement")) {
                            activePiece = new p5.Element(el);
                        }
                    })
                    activePiece.class("selected")
                }
            }
        })
    })

    // check for selecting piece, or rotating selected piece and drop shadow on hover
    pieces.forEach((el) => {
        el.mouseOver(() => {
            el.style("filter", "drop-shadow(0 0 0.1em black)")
        })
        el.mouseOut(() => {
            el.style("filter", "")
        })
        el.i = 0;
        el.mousePressed(() => {
            if (activePiece == undefined) {
                activePiece = el;
                el.class("selected")
            } else {
                if (el.hasClass("selected")) {
                    el.i = (el.i + 1) % 4
                    activePiece.style('transform', 'rotate(' + el.i * 90 + 'deg)');
                }
            }
        })
    })

    // check for selecting piece, or return piece to place and drop shadow
    piecePlaces.forEach((el) => {
        el.mouseOver(() => {
            el.style("filter", "drop-shadow(0 0 2.5em #1d1914)")
        })
        el.mouseOut(() => {
            el.style("filter", "")
        })
        el.mousePressed(() => {
            if (activePiece != undefined) {
                if (el.child().length == 2) {
                    activePiece.parent(el)
                } else {
                    activePiece.removeClass("selected");
                    arr = [].slice.call(el.child());
                    arr.forEach((el) => {
                        if (el.toString().includes("HTMLImageElement")) {
                            activePiece = new p5.Element(el);
                        }
                    })
                    activePiece.class("selected")
                }
            }
        })
    })

}

let s = 20;
let b = 90;
let h = 0;
let cycle = false;

function draw() {
    background(h, s, b);
    if (cycle) {
        h -= 1
        if (h <= 0) {
            cycle = false;
            h += 1;
        }
    } else {
        h += 1;
        if (h >= 255) {
            cycle = true;
            h -= 1;
        }
    }
    background(h, s, b);
}

function mousePressed() {
    if (solved) return;
    if (pieces[0].parent().id == boardPieces[0].id() && pieces[0].i == 1) {
        if (pieces[1].parent().id == boardPieces[3].id() && pieces[1].i == 2) {
            if (pieces[2].parent().id == boardPieces[2].id() && pieces[2].i == 1) {
                if (pieces[3].parent().id == boardPieces[1].id() && (pieces[3].i == 1 || pieces[3].i == 3)) {
                    select("#win").html("You have solved the challenge!");
                    piecePlaces.forEach((el) => { el.mousePressed(() => {}) })
                    pieces.forEach((el) => { el.mousePressed(() => {}) })
                    boardPieces.forEach((el) => { el.mousePressed(() => {}) })
                    activePiece.removeClass("selected");
                    activePiece = undefined;
                    solved = true;
                }
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}