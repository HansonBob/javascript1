function Movement(){
    var d = document.getElementById("debug");
    var content = "";

    if (typeof globalKeys!="undefined") {
        for (var i in globalKeys) {
            if (typeof CustomSettings.Movement.left!="undefined"
                && CustomSettings.Movement.left==i
                && globalKeys[i]==true
            ) {
                left();
            } else if (typeof DefaultSettings.Movement.left!="undefined"
                && DefaultSettings.Movement.left==i
                && globalKeys[i]==true
            ) {
                left();
            }


            if (typeof CustomSettings.Movement.right!="undefined"
                && CustomSettings.Movement.right==i
                && globalKeys[i]==true
            ) {
                right();
            } else if (typeof DefaultSettings.Movement.right!="undefined"
                && DefaultSettings.Movement.right==i
                && globalKeys[i]==true
            ) {
                right();
            }


            if (typeof CustomSettings.Movement.top!="undefined"
                && CustomSettings.Movement.top==i
                && globalKeys[i]==true
            ) {
                top();
            } else if (typeof DefaultSettings.Movement.top!="undefined"
                && DefaultSettings.Movement.top==i
                && globalKeys[i]==true
            ) {
                top();
            }


            if (typeof CustomSettings.Movement.bottom!="undefined"
                && CustomSettings.Movement.bottom==i
                && globalKeys[i]==true
            ) {
                bottom();
            } else if (typeof DefaultSettings.Movement.bottom!="undefined"
                && DefaultSettings.Movement.bottom==i
                && globalKeys[i]==true
            ) {
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

    d.innerHTML = "Debug: "+content;
}
