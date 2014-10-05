var globalKeys = new Array();

window.onload = function(){
    var Lala = new MainLala("container");
    Lala.loadScript("tests/test.js", callbackTestJs);

    var Canvas = new DrawFrame(Lala.getContainerElement());
    Canvas.setDimension();

    var Map = new LalaMap(Canvas.getCanvas());
    Map.loadMap("content/maps/1/1.js", "1", "");

    function callbackTestJs(){
        bla();
    }


    var InstanceOfSetKeys = new SetKeys(globalKeys);

    var options = {
        milliseconds : 40
    };

    var InstanceOfAnimationFrame = new AnimationFrame(options);

    InstanceOfAnimationFrame.setTimer(
        function(){
            Movement();
        }
    );
};