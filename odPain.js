const fs = require('fs');
const path = require('path');

var maxPathLength = 260;

//
// Return array of files in folder and subfolders
//
function getFolders(localPath = './') {
  var dirArray = [];
  var fullPath = fs.realpathSync(localPath);

  console.log(fullPath);

  var files = fs.readdirSync(fullPath);

  files.forEach(function (file) {
    var pathFile = path.join(localPath, file, "/");
    if ( fs.statSync(pathFile).isDirectory() ) {
      // if file is directory recursively call getFolders()
      dirArray = dirArray.concat( getFolders(pathFile) );
    }
    else {
      dirArray.push( path.join(fullPath, file) );
    }
  })
  return dirArray;
}

//
// Return array of files which path is greater 
//
function isGreater(inArray, maxPathLength) {
  var outArray = new Array();
  
  for (var i = 0; i < inArray.length; i++) {
    var currentElement = inArray[i];
    if (currentElement.length > maxPathLength) {
      outArray.push(currentElement);
    }
  }

  return outArray;
}


var folders = getFolders();
var resultFolders = isGreater(folders, maxPathLength);

console.log();

if (resultFolders.length > 0) {
  resultFolders.forEach(function(file) {
    console.log(file);
  })
}
else {
  console.log("There are no files which names are greater", maxPathLength, "in", fs.realpathSync('./'));
}



