var globalKeys = new Array();

function SetKeys(globalKeys){   
    document.body.addEventListener("keydown", function(e){
        globalKeys[e.which] = true;
    }, true);

    document.body.addEventListener("keyup", function(e){
        globalKeys[e.which] = false;
    }, true);
};