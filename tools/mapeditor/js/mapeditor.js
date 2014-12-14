var texturePacks = new Array(
  "../../content/maps/1/1.js"
);

window.onload = function(){
  MapMainLala = new MainLala("container");

  var con = document.getElementById("container");
  var conMap = document.createElement("div");
  conMap.setAttribute("class", "conmap");
  var newTable = document.createElement("div");
  newTable.setAttribute("class", "mapgrid");
  var newMenuRight = document.createElement("div");
  newMenuRight.setAttribute("class", "menuright");
  var newMenuRightInfo = document.createElement("div");

  for (var i=0; i<201; i++) {
    var newTr = document.createElement("div");

    for (var k=0; k<201; k++) {
      var newTd = document.createElement("div");
      newTd.innerHTML = k+":"+i;
      newTd.setAttribute("id", k+"_"+i);

      newTd.addEventListener("click", function(e){
        var targetElement = e.target;
        callbackTdClick(targetElement);
      }, true);

      newTr.appendChild(newTd);
    }

    var clearer = document.createElement("div");
    clearer.setAttribute("class", "clear");
    newTr.appendChild(clearer);
    newTable.appendChild(newTr);
  }

  con.appendChild(conMap);
  conMap.appendChild(newTable);
  newMenuRightInfo.setAttribute("id", "menurightinfo");
  newMenuRight.appendChild(newMenuRightInfo);
  con.appendChild(newMenuRight);

  function callbackTdClick(element){
    newMenuRightInfo.innerHTML = element.getAttribute("id");
  }

  createTextureSelects(con, MapMainLala);
};

function createTextureSelects(con, mainObject){
  var menuright = null;

  for (var i in con.childNodes) {
    var thisChild = con.childNodes[i];

    if (typeof thisChild!="undefined" && thisChild.getAttribute) {
      var thisChildClass = thisChild.getAttribute("class");
      if (thisChildClass.indexOf("menuright")!=-1) {
        menuright = thisChild;
        break;
      }
    }
  }

  if (menuright!=null) {
    var newForm = document.createElement("form");
    var newLabel = document.createElement("label");
    newLabel.innerHTML = "Select Texturepack";
    var newSelect = document.createElement("select");
    for(var i=0; i<texturePacks.length; i++){
      var newOption = document.createElement("option");
      newOption.value = texturePacks[i];
      newOption.innerHTML = texturePacks[i];
      newSelect.appendChild(newOption);
    }

    var newParentSelectTexture = document.createElement("div");
    var newSubmit = document.createElement("input");
    newSubmit.type = "submit";
    newForm.appendChild(newLabel);
    newForm.appendChild(newSelect);
    newForm.appendChild(newParentSelectTexture);
    newForm.appendChild(newSubmit);
    menuright.appendChild(newForm);
    newForm.addEventListener("submit", function(e){
      e.preventDefault();
      var textureSrc = newSelect.value;
      if (textureSrc!="") {
        try {
          mainObject.loadScript(textureSrc);

          if (typeof mapValues.palette!=="undefined") {
            var loadedPalette = mapValues.palette;
            var newSelectTexture = document.createElement("select");
            for(var i in loadedPalette) {
              var newOptionTexture = document.createElement("option");
              newOptionTexture.value = loadedPalette[i][0];
              newOptionTexture.innerHTML = loadedPalette[i][0];
              newSelectTexture.appendChild(newOptionTexture);
            }
            newParentSelectTexture.innerHTML = "";
            newParentSelectTexture.appendChild(newSelectTexture);
          }

          //newSelect.setAttribute("disabled", "disabled");
          //newSubmit.setAttribute("disabled", "disabled");
          saveToStorage();
        } catch(e) {

        }
      }
    }, true);
  }

  function saveToStorage(key, value){
    if (localStorage
      && typeof key!=="undefined"
      && typeof value!=="undefined"
    ) {
      localStorage.setItem(key, value);
    }
  }

  function removeStorage(key){
    if (localStorage
      && typeof key!=="undefined"
    ) {
      localStorage.removeItem(key);
    }
  }

  function getStorage(keyOrValue){
    if (localStorage
      && typeof keyOrValue!=="undefined"
    ) {
      if (typeof localStorage[keyOrValue]!=="undefined"){
        return localStorage[keyOrValue];
      } else {
        var storageArray = localStorage;
        if (storageArray.length!=0) {
          for (var i in storageArray) {
            if (storageArray[i]==keyOrValue) {
              return storageArray[i];
            }
          }
        }
      }
      return false;
    }
  }
}