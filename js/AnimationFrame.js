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
