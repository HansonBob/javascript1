function LalaMap(canvas){
    var canvas = canvas;

    this.loadMap = function loadMap(mapFile, mapName, mapStart){
        if (typeof mapFile!="undefined"
            && typeof mapName!="undefined"
            && typeof mapStart!="undefined"
            && typeof canvas!="undefined"
        ) {
            var Lala = new MainLala();
            Lala.loadScript(mapFile, mapCallback);

            function mapCallback(){
                
            }
        }
    }
}