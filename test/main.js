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

window.onload = function(){
    var Lala = new MainLala("main");
    Lala.loadScript("js/test.js", callbackTestJs);

    function callbackTestJs(){
        bla();
    }
};