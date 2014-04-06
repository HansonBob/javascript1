function Movement(){
    var d = document.getElementById("debug");
    var content = "";

    if (typeof globalKeys!="undefined") {
        for (var i in globalKeys) {
            if (i==65 && globalKeys[i]==true) {
                left();
            }

            if (i==68 && globalKeys[i]==true) {
                right();
            }

            if (i==87 && globalKeys[i]==true) {
                top();
            }

            if (i==83 && globalKeys[i]==true) {
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
