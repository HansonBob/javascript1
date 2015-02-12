function DrawPlayer(canvas, mapStart, playerProperties){
  var defaultProperties = {
    "name" : "Player",
    "graphics" : new Array("tests/player/player-all.png", 48, 240),
    "animation" : new Array("left", "right", "up", "down", "attack")
  };

  var playerProperties = playerProperties || defaultProperties;

  if (typeof playerProperties["name"]==="undefined") {
    playerProperties["name"] = defaultProperties["name"];
  }

  if (typeof playerProperties["graphics"]==="undefined") {
    playerProperties["graphics"] = defaultProperties["graphics"];
  }

  if (typeof playerProperties["animation"]==="undefined") {
    playerProperties["animation"] = defaultProperties["animation"];
  }

  var canvasContext2d = canvas.getContext("2d");

  checkTextureLoad(playerProperties["graphics"], function(){
    var playerImage = new Image(
      playerProperties["graphics"][1],
      playerProperties["graphics"][2]
    );

    playerImage.src = playerProperties["graphics"][0];
    
    playerImage.onload = function(){
      canvasContext2d.drawImage(
        playerImage,
        mapStart[0]*32,
        mapStart[1]*32,
        playerImage.width,
        playerImage.height
      );
    };
  });

  function checkTextureLoad(images, callback){
    texturesLoaded = true;
    var checkIndexLoaded = 3;

    if ( typeof images[checkIndexLoaded]==="undefined"
      || images[checkIndexLoaded]!="loaded"
    ) {
      texturesLoaded = false;
      var newImage = new Image(images[1], images[2]);
      newImage.src = images[0];
      newImage.onload = function() {
        images[checkIndexLoaded] = "loaded";
      }
    }

    if (texturesLoaded!==true) {
      window.setTimeout(function(){
        checkTextureLoad(images, callback);
      }, 1000);
    } else {
      callback();
    }
  }
}