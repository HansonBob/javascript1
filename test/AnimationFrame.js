function Movement(){
    var con = document.getElementById("container");
    var content = "";

    if (typeof tmpGlobal!="undefined") {
        for (var i in tmpGlobal) {
            if (i==65 && tmpGlobal[i]==true) {
                left();
            }

            if (i==68 && tmpGlobal[i]==true) {
                right();
            }

            if (i==87 && tmpGlobal[i]==true) {
                top();
            }

            if (i==83 && tmpGlobal[i]==true) {
                bottom();
            }
        }
    }

    function left(){
        content += "left";
    }

    function right(){
        content += "right";
    }

    function top(){
        content += "top";
    }

    function bottom(){
        content += "bottom";
    }

    con.innerHTML = content;
}


function SetKeys(tmpGlobal){   
    document.body.addEventListener("keydown", function(e){
        tmpGlobal[e.which] = true;
    }, true);

    document.body.addEventListener("keyup", function(e){
        tmpGlobal[e.which] = false;
    }, true);
};


function AnimationFrame(options){
    var milliseconds = 200;
    var options = options || {};
    var AnimationFrameTimer = {};

    if (typeof options.milliseconds!="undefined") {
        milliseconds = options.milliseconds;
    }

    var setTimer = function setTimer(callback){
        AnimationFrameTimer = window.setTimeout(function(){
            if (typeof callback!="undefined") {
                callback();
            }
            
            setTimer(callback);
        }, milliseconds);
    }

    this.setTimer = setTimer;

    this.getTimer = function(){
        return AnimationFrameTimer;
    };

    this.clearTimer = function(){
        window.clearTimeout(AnimationFrameTimer);
    };
}

var tmpGlobal = new Array();
window.onload = function(){
    var InstanceOfSetKeys = new SetKeys(tmpGlobal);

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