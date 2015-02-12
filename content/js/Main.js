var globalKeys = new Array();

window.onload = function(){
    var Lala = new MainLala("container");
    //Lala.loadScript("tests/test.js", callbackTestJs);

    var Canvas = new DrawFrame(Lala.getContainerElement());
    Canvas.setDimension();

    var Map = new LalaMap(Canvas.getCanvas());
    var mapEntry = Array(3, 3);
    Map.loadMap("content/maps/1/1.js", "test", mapEntry);

    var DrawPlayerInstance = new DrawPlayer(
        Canvas.getCanvas(),
        mapEntry,
        {
            "name" : "Player 1"
        }
    );

    function callbackTestJs(){
        
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