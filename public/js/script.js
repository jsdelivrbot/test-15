
function hidePartOfTable(elemId) {
  var elem = document.getElementById(elemId);
  var table = elem.getElementsByTagName('table');
  var buttonForHide = elem.getElementsByTagName('button')[0];

  if(buttonForHide.innerText === "hide") {
    table[0].tHead.style.display = "none";
    table[0].tBodies[0].style.display = "none";
    buttonForHide.innerText = "show";
  } else {
    table[0].tHead.style.display = "table-header-group";
    table[0].tBodies[0].style.display = "table-row-group";
    buttonForHide.innerText = "hide";
  }
}


function setScriptToIframe(elemId) {
  var elem = document.getElementById(elemId);
  var iframe = elem.getElementsByTagName('iframe')[0];
  var code = elem.getElementsByTagName('textarea')[0].value;
  var iframeWindow = iframe.contentWindow;
  
  var objToSend = {
	  task: elemId,
	  codeStr: code 
  };
  //iframeDocument.body.appendChild(script);
  
  iframeWindow.postMessage(JSON.stringify(objToSend), "*");
  
  bindEvent(window, 'message', function (e) {
            alert(e);
  });
  

}

 function bindEvent(element, eventName, eventHandler) {
	if (element.addEventListener) {
		 element.addEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, eventHandler);
	}
}
        /* var iframeSource = 'https://gist.github.com/pbojinov/8965299/raw/fadf2c4058b6481646e7244994c1890f2ad81b60/iframe.html';
        // Create the iframe
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', iframeSource);
        iframe.setAttribute('id', 'the_iframe');
        iframe.style.width = 450 + 'px';
        iframe.style.height = 200 + 'px';
        document.body.appendChild(iframe);
        // Send a message to the child iframe
        var iframeEl = document.getElementById('the_iframe'),
            messageButton = document.getElementById('message_button'),
            results = document.getElementById('results');
        // Send a message to the child iframe
        var sendMessage = function(msg) {
            // Make sure you are sending a string, and to stringify JSON
            document.postMessage(msg, '*');
        };
        // Send random messge data on every button click
        bindEvent(messageButton, 'click', function (e) {
            var random = Math.random();
            sendMessage('' + random);
        });
        // Listen to message from child window
         */
