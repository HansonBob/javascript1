var MainLala = function(id){
    if (typeof id!="undefined"
        && id!=""
    ) {
        var containerElement = document.getElementById(id);
        this.containerElement = containerElement;
    }

    this.getContainerElement = function(){
        if (typeof this.containerElement!="undefined") {
            return this.containerElement;
        } else {
            return null;
        }
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
            return true;
        } else {
            return false;
        }
    };
};
