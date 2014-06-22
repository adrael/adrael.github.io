var canvasElement = null;
var canvasContext = null;
var speed = 1;
var oldSpeed = 1;

var mainLoop = null;
var lastUpdate = Date.now();
var dt = 0;

function updateTime() {
    var now = Date.now();
    dt = now - lastUpdate;
    lastUpdate = now;       
}

function update() {
    updateTime();
    world.update(dt * speed);
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    world.draw(canvasContext);
}

function init() {
    
    canvasElement = document.getElementById("canvas");
    canvasContext = this.canvasElement.getContext("2d");

    world = new World(canvasElement.width, canvasElement.height);

    var woodVolume = 1000;

    while (woodVolume > 0) {

        var volumeToTakeAway = Math.ceil(Math.random() * woodVolume / 5) + 50;

        volumeToTakeAway = (volumeToTakeAway > woodVolume) ? woodVolume : volumeToTakeAway;
        woodVolume -= volumeToTakeAway;

        var woodHeap = new WoodHeap();
        world.addAgent(woodHeap);
        woodHeap.setWoodVolume(volumeToTakeAway);
        woodHeap.moveTo(canvasElement.width * Math.random(), canvasElement.height * Math.random());
    }

    for(var i = 0; i < 6; i++) {
        var wall = new Wall();
        world.addAgent(wall);
        wall.moveTo(    canvasElement.width * Math.random(),
                        canvasElement.height * Math.random());
    }

    for(i = 0; i < 50; i ++) {
        var termite = new Termite();
        world.addAgent(termite);
        termite.moveTo( canvasElement.width * Math.random(), 
                        canvasElement.height * Math.random());
    }

    var fps = 120;
    mainLoop = setInterval(update, 1000 / fps); 
//      update();
}

function toTop() {
    $("body").animate({scrollTop: 0}, 1000);
}

$(window).scroll(function() {
    if ($("body").scrollTop() > 100) {
        $('.backToTop').fadeIn();
    } else {
        $('.backToTop').fadeOut();
    }
});

$(document).ready(function() {

    init();

    $('input#umbilical').change(
        function () {
            GLOBAL_DRAW_UMBILICAL = !GLOBAL_DRAW_UMBILICAL;
        }
    );

    $('#speedSlider').slider({
        value: speed,
        step: 0.01,
        min: 0,
        max: 10,
        slide:function() {
            speed = $('#speedSlider').slider("value");
            $('#speedValue').html("Vitesse:" + Math.floor(speed * 100) + "%");
        }
    });

    $('button.btn-primary')
    .css('display', 'none')
    .click(
        function () {
            speed = oldSpeed;
            $('#speedValue').html("Vitesse:" + Math.floor(speed * 100) + "%");
            $('#speedSlider').slider('value', speed);
            $(this).css('display', 'none');
            $('button.btn-warning').css('display', 'initial');
        }
    );

    $('button.btn-warning').click(
        function () {
            oldSpeed = speed;
            speed = 0;
            $('#speedValue').html("Vitesse:" + Math.floor(speed * 100) + "%");
            $('#speedSlider').slider('value', speed);
            $(this).css('display', 'none');
            $('button.btn-primary').css('display', 'initial');
        }
    );

    $('button.btn-success').click(
        function () {
            location.reload();
        }
    );

    $('button.btn-danger').click(
        function () {
            console.clear();
        }
    );
});