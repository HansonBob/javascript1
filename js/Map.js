function LalaMap(container){
    var MapContainer = container;
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;

    this.getWindowDimension = function getWindowDimension(){
        return new Array(winWidth, winHeight);
    };

    this.setContainerDimension = function setContainerDimension(){
        if (typeof container!="undefined") {
            MapContainer.setAttribute("width", winWidth);
            MapContainer.style.width = winWidth+"px";
            MapContainer.setAttribute("height", winHeight);
            MapContainer.style.height = winHeight+"px";
        }
    };
}