var images = {
  "gras": new Array("../content/maps/1/images/gras1.png", 32, 32)
  ,"dirt": new Array("../content/maps/1/images/dirt1.png", 32, 32)
};

var texturesLoaded = false;

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

function callback(){
  for (var i in images) {
    var newImage = new Image(images[i][1], images[i][2]);
    newImage.src = images[i][0];
    document.body.appendChild(newImage);
  }
}

checkTextureLoad(images, callback);