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
  createSaveForm(newMenuRight, newTable);
  createSpecialFields(newMenuRight);
};

function searchMenuright(con){
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

  return menuright;
}

function createTextureSelects(con, mainObject){
  var menuright = searchMenuright(con);

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
    var newInput = document.createElement("input");
    var newSelect = document.createElement("select");
    var newSubmit = document.createElement("input");
    var newEraseButton = document.createElement("option");

    newInput.setAttribute("name", "mapname");
    newSubmit.setAttribute("type", "submit");
    newEraseButton.innerHTML = "erase";
    newEraseButton.setAttribute("value", "");
    newSelect.appendChild(newEraseButton);

    newForm.appendChild(newInput);
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
    if (typeof fieldObject!=="undefined" && typeof texture!=="undefined" && texture!=="") {
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

      var allOptions = document.getElementsByTagName("option");
      if (typeof allOptions!=="undefined") {
        for (var i=0; i<allOptions.length; i++) {
          if (allOptions[i].getAttribute("value")===texture) {
            fieldObject.setAttribute("data-texture", allOptions[i].innerHTML);
            break;
          }
        }
      }
    } else if (typeof fieldObject!=="undefined" && texture==="") {
      eraseField(fieldObject);
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
}

function createSaveForm(parent, mapDiv) {
  var newForm = document.createElement("form");
  var newSubmit = document.createElement("input");
  newSubmit.setAttribute("type", "submit");
  newSubmit.setAttribute("value", "save");
  newForm.appendChild(newSubmit);
  parent.appendChild(newForm);

  newForm.addEventListener("submit", function(e){
    e.preventDefault();
    var saveString = "";
    var saveValues = "";
    var savePalette = {};
    var saveName = "";
    var newSaveWindow = window.open("about:blank", "savewindow");

    if (typeof mapDiv!=="undefined") {
      var mapRows = mapDiv.childNodes;
      for (var i=0; i<mapRows.length; i++) {
        for (var k=0; k<mapRows[i].childNodes.length; k++) {
          var currentCell = mapRows[i].childNodes[k];

          if (typeof currentCell!=="undefined"
            && currentCell.nodeName.toLowerCase()=="div"
            && typeof currentCell.getAttribute("style")!=="undefined"
            && currentCell.getAttribute("style")!==null
          ) {
            var cellId = currentCell.getAttribute("id");
            
            if (cellId!==null
              && typeof cellId!=="undefined"
            ) {
              cellId = cellId.replace(/\_/, ", ");
              var cellTexture = currentCell.getAttribute("data-texture");
              var cellStyles = currentCell.getAttribute("style");
              var cellBackgroundImage = cellStyles.match(/background\-image\:url\((.*)\)\;/);
              cellBackgroundImage = cellBackgroundImage[1].substring("../../".length);
              cellBackgroundImage = cellBackgroundImage.substring(0, (cellBackgroundImage.length-1));
              cellBackgroundImage = cellBackgroundImage.substring(1);
              
              if (saveValues!=="") {
                saveValues += ","
              } else {
                saveValues += "\"values\" : new Array(\n";
              }

              saveValues += "["+cellId+", \""+cellTexture+"\"]\n";

              savePalette[cellTexture] = new Array(cellBackgroundImage, currentCell.offsetWidth, currentCell.offsetHeight);
            }
          }
        }
      }
    }

    if (saveValues!=="") {
      saveValues += "\n),";
    }

    saveString += "var mapValues = {\n";

    var tmpInputs = document.getElementsByTagName("input");

    if (typeof tmpInputs!=="undefined") {
      for (var i=0; i<tmpInputs.length; i++) {
        if (typeof tmpInputs[i]!=="undefined") {
          var tmpInputName = tmpInputs[i].getAttribute("name");
          if (tmpInputName!=null && typeof tmpInputName!=="undefined" && tmpInputName==="mapname") {
            var tmpInputValue = tmpInputs[i].value;

            if (typeof tmpInputValue!=="undefined" && tmpInputValue!=="") {
              saveName = "\"name\":\""+tmpInputValue+"\",\n";
            }
            break;
          }
        }
      }
    }

    if (saveName=="") {
      saveName = "\"name\":\""+makeString()+"\",\n";
    }

    saveString += saveName;

    saveString += saveValues+"\n";

    saveString += "\"palette\" : {\n";
    var tmpPalette = 0;
    for (var i in savePalette) {
      if (tmpPalette!=0) saveString += ",";

      saveString += "\""+i+"\": new Array(\""+savePalette[i][0]+"\","+savePalette[i][1]+","+savePalette[i][2]+")\n";
      tmpPalette++;
    }
    saveString += "}\n";

    saveString += "\n};";

    newSaveWindow.document.write("<pre>"+saveString+"</pre>");
  }, true);
}

function createSpecialFields(parent) {
  var selectOptions = {
    "remove special" : "removespecial"
    ,"starts" : "starts"
    ,"exists" : "exists"
  };

  var newForm = document.createElement("form");
  var newSelect = document.createElement("select");
  var newSubmit = document.createElement("input");
  newSubmit.setAttribute("type", "submit");

  for (var i in selectOptions) {
    var newOption = document.createElement("option");

    newOption.setAttribute("value", selectOptions[i]);
    newOption.innerHTML = i;
    newSelect.appendChild(newOption);
  }

  newForm.appendChild(newSelect);
  newForm.appendChild(newSubmit);
  parent.appendChild(newForm);

  newForm.addEventListener("submit", function(e){
    e.preventDefault();

    var fieldId = document.getElementById("menurightinfo").innerHTML;
    var fieldObject = document.getElementById(fieldId);

    if (newSelect.value!=="removespecial") {
      fieldIdXY = fieldId.replace(/\_/, ", ");
      fieldObject.setAttribute("data-special", newSelect.value+","+fieldIdXY);
    } else {
      fieldObject.removeAttribute("data-special");
    }
  }, true);
}

function makeString() {
  var d = new Date();
  var text = "map"+d.getTime();

  return text;
}

function eraseField(field) {
  var styleAttr = field.getAttribute("style");
  if (styleAttr!==null && typeof styleAttr!=="undefined") {
    field.removeAttribute("style");
    field.removeAttribute("data-texture");
  }
}