function LalaMap(container){
    var MapContainer = container;
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;

    this.getWindowDimension = function getWindowDimension(){
        return new Array(winWidth, winHeight);
    };

    this.setContainerDimension = function setContainerDimension(width, height){
        if (typeof width!="undefined"
            && typeof height!="undefined"
        ) {
            winWidth = width;
            winHeight = height;
        }

        if (typeof container!="undefined") {
            MapContainer.setAttribute("width", winWidth);
            MapContainer.style.width = winWidth+"px";
            MapContainer.setAttribute("height", winHeight);
            MapContainer.style.height = winHeight+"px";
        }
    };

    this.loadMap = function loadMap(mapFile, mapName, mapStart){
        if (typeof mapFile!="undefined"
            && typeof mapName!="undefined"
            && typeof mapStart!="undefined"
            && typeof MapContainer!="undefined"
        ) {
            var Lala = new MainLala(MapContainer);
            Lala.loadScript(mapFile, mapCallback);

            function mapCallback(){
                
            }
        }
    }
}