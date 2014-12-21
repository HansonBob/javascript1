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
    var texturesLoaded = new Array();

    for(var i=0; i<texturePacks.length; i++){
      var mapScriptLoaded = mainObject.loadScript(texturePacks[i], function(){
        if (mapScriptLoaded===true && typeof mapValues!=="undefined") {
          var textureGroup = document.createElement("optgroup");
          textureGroup.setAttribute("label", mapValues.name);

          for (var k in mapValues.palette) {
            texturesLoaded.push(new Array(k, mapValues.palette[k]));
          }

          createTextureOptions(textureGroup, texturesLoaded);
          newSelect.appendChild(textureGroup);
        }
      });
    }
    
    var newForm = document.createElement("form");
    var newSelect = document.createElement("select");
    var newSubmit = document.createElement("input");
    newSubmit.setAttribute("type", "submit");

    newForm.appendChild(newSelect);
    newForm.appendChild(newSubmit);
    menuright.appendChild(newForm);

    newForm.addEventListener("submit", function(e){
      e.preventDefault();

      var menurightInfo = document.getElementById("menurightinfo");
      if (typeof menurightInfo!=="undefined" && menurightInfo.innerHTML!=="") {
        var fieldId = menurightInfo.innerHTML;
        var fieldObject = document.getElementById(fieldId);
        setTextureToField(fieldObject, newSelect.value);
      }
    }, true);
  }

  function setTextureToField(fieldObject, texture) {
    if (typeof fieldObject!=="undefined" && typeof texture!=="undefined") {
      var fieldObjectStyles = fieldObject.getAttribute("style");
      if (fieldObjectStyles!==null
        && typeof fieldObjectStyles!=="undefined"
        && fieldObjectStyles.indexOf("background-image")!==-1
      ) {
        var newStyle = "background-image:url('"+texture+"');";
        var regex = /background\-image\:url\(\'.*\'\);/;
        fieldObjectStyles = fieldObjectStyles.replace(regex, newStyle);
      } else {
        fieldObjectStyles = "background-image:url('"+texture+"');background-repeat:no-repeat;background-position:0px 0px;background-size:cover;"
      }

      fieldObject.setAttribute("style", fieldObjectStyles);

      /*
      for (var i=0; i<fieldObject.childNodes.length; i++) {
        var nodeName = fieldObject.childNodes[i].nodeName;
        if (nodeName=="IMG" || nodeName=="img") {
          fieldObject.childNodes[i].src = texture;
          return true;
        }
      }

      var newImg = document.createElement("img");
      newImg.src = texture;
      newImg.setAttribute("class", "maptextureimg");
      fieldObject.appendChild(newImg);
      */
    }
  }

  function createTextureOptions(optgroup, texturesLoaded) {
    for (var i=0; i<texturesLoaded.length; i++) {
      var newOption = document.createElement("option");
      newOption.innerHTML = texturesLoaded[i][0];
      newOption.value = "../../"+texturesLoaded[i][1][0];
      optgroup.appendChild(newOption);
    }
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