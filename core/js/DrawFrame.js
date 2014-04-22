function DrawFrame(container){
    var container = container;
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var newCanvas = document.createElement("canvas");

    newCanvas.style.backgroundColor = "#000000";
    newCanvas.style.display = "block";

    container.appendChild(newCanvas);

    this.getCanvas = function getCanvas(){
        return newCanvas;
    };

    this.getDimension = function getDimension(){
        return new Array(winWidth, winHeight);
    };

    this.setDimension = function setDimension(width, height){
        if (typeof width!="undefined"
            && typeof height!="undefined"
        ) {
            winWidth = width;
            winHeight = height;
        }

        newCanvas.setAttribute("width", winWidth);
        newCanvas.style.width = winWidth+"px";
        newCanvas.setAttribute("height", winHeight);
        newCanvas.style.height = winHeight+"px";
    };
}