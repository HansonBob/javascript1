function LalaMap(canvas){
    var canvas = canvas;

    this.loadMap = function loadMap(mapFile, mapName, mapStart){
        if (typeof mapFile!="undefined"
            && typeof mapName!="undefined"
            && typeof mapStart!="undefined"
            && typeof canvas!="undefined"
        ) {
            var Lala = new MainLala();
            var mapScriptLoaded = Lala.loadScript(mapFile, mapCallback);
            var canvasContext2d = canvas.getContext("2d");

            function mapCallback(){
                if (mapScriptLoaded===true && typeof mapValues!=="undefined") {
                    var size = mapValues.values.length;
                    var texturesCount = 0;
                    for (var i in mapValues.palette) {
                        texturesCount++;
                    }

                    var loopCount = 0;
                    var textures = mapValues.palette;

                    checkTextureLoad(textures, function(){
                        for (var i=0; i<size; i++) {
                            var texturePosX = mapValues.values[i][0];
                            var texturePosY = mapValues.values[i][1];
                            var textureName = mapValues.values[i][2];
                            var textureSrc = mapValues.palette[textureName][0];
                            var textureSizeX = mapValues.palette[textureName][1];
                            var textureSizeY = mapValues.palette[textureName][2];

                            var backgroundImage = new Image(textureSizeX, textureSizeY);
                            backgroundImage.src = textureSrc;

                            canvasContext2d.drawImage(
                                backgroundImage
                                ,(texturePosX*parseInt(textureSizeX))
                                ,(texturePosY*parseInt(textureSizeY))
                                ,textureSizeX
                                ,textureSizeY
                            );
                        }
                    });
                }
            }
        }
    }

    function checkTextureLoad(images, callback){
      for (var i in images) {
        texturesLoaded = true;
        var checkIndexLoaded = 3;

        if (typeof images[i][checkIndexLoaded]==="undefined"
          || images[i][checkIndexLoaded]!="loaded"
        ) {
          texturesLoaded = false;
          var newImage = new Image(images[i][1], images[i][2]);
          newImage.src = images[i][0];

          newImage.onload = function() {
            images[i][checkIndexLoaded] = "loaded";
          }
        }
      }

      if (texturesLoaded!==true) {
        window.setTimeout(function(){
          checkTextureLoad(images, callback);
        }, 250);
      } else {
        callback();
      }
    }
}