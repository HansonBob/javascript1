function SetKeys(globalKeys){   
    document.body.addEventListener("keydown", function(e){
        if (typeof globalKeys!="undefined"
            && typeof e!="undefined"
            && typeof e.which!="undefined"
        ) {
            globalKeys[e.which] = true;
        }
    }, true);

    document.body.addEventListener("keyup", function(e){
        if (typeof globalKeys!="undefined"
            && typeof e!="undefined"
            && typeof e.which!="undefined"
        ) {
            globalKeys[e.which] = false;
        }
    }, true);
};