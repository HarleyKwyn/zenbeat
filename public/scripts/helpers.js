var initAlert = function(interpreter, scope) {
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));
};
var disable = function(disabled) {
  document.getElementById('stepButton').disabled = disabled;
  document.getElementById('stepInButton').disabled = disabled;
  document.getElementById('stepOverButton').disabled = disabled;
  document.getElementById('runButton').disabled = disabled;
};
var isCompleteStatement = function(programString, start, end){
  // var str = $scope.editor.getValue();
  var currChar;
  for(var i = end; i < programString.length; i++){
    currChar = programString[i];
    if(!(/\s/.test(currChar)))  //currCharacter is NOT a white space
      return false;
    if(/\r|\n/.test(currChar)){  //new line found (good)
      break;
    }
  }
  for(var j = start - 1 ; j >= 0; j--){
    currChar = programString[j];
    if(!(/\s/.test(currChar)))
      return false;  //return false bc character is NOT a white space
    if(/\r|\n/.test(currChar)){
      break;
    }
  }
  //console.log(str.substring(start, end));
  return true;
};  //END isCompleteStatement
var getNextCompleteStatement = function(programString, start, end){
  var nextStart;
  var nextEnd;
  var currChar;
  var completeStatementBoolean;
  var statement = programString.slice(start, end);
  var nextCompleteStatement = {};
  for (var i = end; i < programString.length; i++){  //iterate until a non-whitespace / non-new line char is found
    currChar = programString[i];
    if ( !(/\r|\n/.test(currChar) || /\s/.test(currChar))){
      nextStart = i;
      break;
    }
  }
  for(var j = nextStart; j < programString.length; j++){   //iterate until a new line char is found
    currChar = programString[j];
    if (/\r|\n/.test(currChar)){
      nextEnd = j;
      break;
    }
  }
  if(isCompleteStatement(programString, nextStart, nextEnd)){
    nextCompleteStatement.string = programString.slice(nextStart, nextEnd);
    nextCompleteStatement.start = nextStart;
    nextCompleteStatement.end = nextEnd;
    return nextCompleteStatement;
  }
  return null;
};
var removeSelfReferences = function(scope){
  for(var prop in scope){
    if(typeof scope[prop] === "object"){
      scope[prop] = "{}";
    }
  }
};
