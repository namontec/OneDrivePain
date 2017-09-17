const fs = require('fs');
const path = require('path');
const maxPathLength = 260;

//
// Return array of files in folder and subfolders
//
function getFolders(localPath = './') {
  var dirArray = [];
  var fullPath = fs.realpathSync(localPath);

  console.log(fullPath);

  var files = fs.readdirSync(fullPath);
  
  var filesCount = files.length;
  for (var i = 0; i < filesCount ; i++){
    var file = files[i];
    var pathFile = path.join(localPath, file, "/");

    // if file is directory recursively call getFolders()
    if ( fs.statSync(pathFile).isDirectory() ) {
      dirArray = dirArray.concat( getFolders(pathFile) );
    }
    else {
      dirArray.push( path.join(fullPath, file) );
    }
  }

  return dirArray;
}

//
// Return array of files which path is greater 
//
function foldersGreaterThan(inArray, maxPathLength) {
  var outArray = new Array();
  
  for (var i = 0; i < inArray.length; i++) {
    var currentElement = inArray[i];
    if (currentElement.length > maxPathLength) {
      outArray.push(currentElement);
    }
  }

  return outArray;
}

function printResults(resultFolders) {
  if (resultFolders.length > 0) {
    console.log("There are", resultFolders.length, "files which names are greater", maxPathLength, "in", fs.realpathSync('./'));
    resultFolders.forEach(function(file) {
      console.log(file);
    })
  }
  else {
    console.log("There are no files which names are greater", maxPathLength, "in", fs.realpathSync('./'));
  }
}



var folders = getFolders();
var resultFolders = foldersGreaterThan(folders, maxPathLength);
printResults(resultFolders);







