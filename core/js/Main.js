var MainLala = function(id){
    if (typeof id!="undefined"
        && id!=""
    ) {
        var containerElement = document.getElementById(id);
        this.containerElement = containerElement;
    } else {
        alert("id not defined!");
        return false;
    }

    this.getContainerElement = function(){
        return this.containerElement;
    }
    
    this.loadScript = function(src, callback){
        if (typeof src!="undefined"
            && src!=""
        ) {
            var newScript = document.createElement("script");
            var docHead = document.getElementsByTagName("head")[0];

            newScript.src = src;
            newScript.type = "text/javascript";
            
            newScript.onreadystatechange = callback;
            newScript.onload = callback;

            docHead.appendChild(newScript);
        }
    };
};

var globalKeys = new Array();

window.onload = function(){
    var Lala = new MainLala("container");
    Lala.loadScript("tests/test.js", callbackTestJs);

    var Map = new LalaMap(Lala.getContainerElement());
    Map.setContainerDimension();

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