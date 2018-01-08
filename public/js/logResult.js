function logResult(obj) {
	
  var br = document.createElement("br");
  var divResult = document.getElementById("block-results");

  divResult.appendChild(br);
  for(var i = 0; i < arguments.length; ++i) {
	  
	if(arguments[i] instanceof Error) {
		divResult.appendChild(logException(arguments[i]));
	}else if(Array.isArray(arguments[i])) {
		divResult.appendChild(logArray(arguments[i]));
	} else if(arguments[i] instanceof Function) {
		divResult.appendChild(logFunction(arguments[i]));
	} else if(arguments[i] instanceof Object) {
		divResult.appendChild(logObject(arguments[i]));
	} else {
		divResult.appendChild(logValue(arguments[i]));
	}
	
	var hr = document.createElement("hr");
	hr.className = "line-break";
	divResult.appendChild(hr);
  }
  
  document.body.appendChild(divResult);
}

function logObject(obj) {
  var div = document.createElement("div");
  var br = document.createElement("br");
  var ul = document.createElement("ul");

  div.innerHTML += "{";
  div.appendChild(br);
  ul.className = "object-list";
  div.appendChild(ul);

  if(Array.isArray(obj)) {
    return logArray(obj);//TODO LogArray()
  }

  for(var property in obj) {

    var li = document.createElement("li");
    var span = document.createElement("span");

    span.className = "property-object";
    span.innerText = property;
    li.appendChild(span);
    li.innerHTML += " : ";

    if(obj instanceof Function) {
      li.appendChild(logFunction(obj[property]));

    } else if(Array.isArray(obj[property])) {
      li.appendChild(logArray(obj[property]));

    } else if(obj[property] instanceof Object) {
      li.appendChild(logObject(obj[property]));

    } else {
      li.appendChild(logValue(obj[property]));
    }

    ul.appendChild(li);
  }
  div.innerHTML += "}";
  return div;
}

function logFunction(fun) {
  var span = document.createElement("span");

  span.className = "function-object";
  span.innerText += fun.toString();

  return span;
}

function logValue(value) {
  var span = document.createElement("span");

  span.className = "var-value";
  if(typeof value == "string"){
    span.innerText += "\"" + value + "\"";
  } else {
      span.innerText += value;
  }

  return span;
}

function logArray(array) {
  var div = document.createElement("div");

  div.className = "array-object";
  div.innerHTML += " [";
  for (var i = 0; i < (array.length - 1); i++) {
    div.appendChild(getElemString(array[i]));
    div.innerHTML += ", ";
  }

  div.appendChild(getElemString(array[array.length - 1]));
  div.innerHTML += "] ";

  return div;

  function getElemString(elem) {
    var span = logValue(elem);
    span.className = "array-element";

    if(elem instanceof Object) {
      span.innerText = JSON.stringify(elem);
    }

    return span;
  }
}

function logException(ex) {
	var div = document.createElement("div");
	
	div.className = "exception";
	div.innerHTML += "Exception!";
	div.innerHTML += ex.name + " : ";
	div.innerHTML += ex.message;
	
	return div;
}