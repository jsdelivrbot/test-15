function argumentsToArray(start,arg) {
	var argArray = [];

	for (var i = start; i < arg.length; i++) {
		argArray.push(arg[i]);
	}

	return argArray;
}

Array.prototype.push = function (/* value/object or array */) {

	var argumentsLegth = arguments.length;

    for (var i = 0; i < argumentsLegth; ++i) {

    	if( Array.isArray(arguments[i]) ) {
    		var arrayLength = arguments[i].length;
    		for (var j = 0 ; j < arrayLength; ++j) {
    		  this[this.length] = arguments[i][j];
    		}
    	} else {
    		this[this.length] = arguments[i];
    	}
    }

	return this.length;
};

Array.prototype.pop = function () {

  var lastItem = this[this.length - 1];

  this.length -= 1;

  return lastItem;
};

Array.prototype.concat = function (/* value1, ..., valueN */) {

	var newArray = [];
	var argumentsLegth = arguments.length;

	newArray.push(this);

	for (var i = 0; i < argumentsLegth; i++) {
		newArray.push(arguments[i]);
	}

	return newArray;
};

Array.prototype.join = function (separator) {

	var _separator = separator || "";
	var str = "";
	var len = this.length;

	for (var i = 0; i <  ( len - 1); i++) {
		str += this[i];
		str += _separator;
	}

	str += this[len - 1];

	return str;
};

Array.prototype.reverse = function () {

	var len = this.length;

	for (var i = 0, end = (len - 1); i < (len / 2); i++, end--) {
		var temp = this[i];
		this[i] = this[end];
		this[end] = temp;
	}

	return this;
};

Array.prototype.shift = function () {

	var firstElem = this[0];
	var len = this.length;

	for(var i = 1; i < len; i++){
		this[i-1] = this[i];
	}
	this.length -= 1;

	return firstElem;
};

Array.prototype.unshift = function () {

	var tempArray = argumentsToArray(0, arguments);

	tempArray = tempArray.concat(this);
	this.length = 0;
  this.push(tempArray);

	return this.length;
};


Array.prototype.slice = function (begin /*[,end]*/) {

	begin = begin || 0;
	var len = this.length;
	var startFrom = (begin < 0)
									? (len + begin)
									: (begin);
	var end = arguments[1] || len;
	var newArray = [];

	if(end < 0 && Math.abs(end) <= len) {
		end = len + end;
	} else if(Math.abs(end) > len){
		end = len;
	}

	for (var i = startFrom; i < end; i++) {
		newArray.push(this[i]);
	}

	return newArray;
};

Array.prototype.splice = function (start, deleteCount/*,[item,item]]*/) {

	if(deleteCount == null) {
		deleteCount = this.length;
	}
	var removedElement = this.slice( start, start + deleteCount );
	var addedItems = [];

	addedItems.push(argumentsToArray(2,arguments));

	var tempArray = this.slice(0,start).concat( addedItems,
			 							this.slice( start + deleteCount, this.length ) );

	this.length = 0;
  this.push(tempArray);

  return removedElement;
};

Array.prototype.toSource = function () {

	var str = "[";
	var len = this.length;

	function AddQuotes(elem) {
		var tempStr = "\"";
		tempStr += elem;
		tempStr += "\"";
		return tempStr;
	}

	for (var i = 0; i < (len - 1); i++) {
		str += AddQuotes(this[i]);
		str += ", ";
	}
	AddQuotes(this[len - 1]);
	str += "]";

	return str;
}
