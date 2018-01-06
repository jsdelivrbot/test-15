function BrowserInfo(name, ver) {
	this.name = name;
	this.version = ver;
}

function getBrowserInfo() {

  var userAgent = navigator.userAgent;
	var temp = null;
	var matchedStr = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if(/trident/i.test(matchedStr[1])) {
      temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return new BrowserInfo("IE",temp[1] || '');
  }

    if(matchedStr[1]==='Chrome') {
        temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)
        if(temp != null) {
					return new BrowserInfo(temp[1], temp[2]);
				}
    }

    matchedStr = matchedStr[2] ?
				[matchedStr[1], matchedStr[2]]:
				[navigator.appName, navigator.appVersion, '-?'];
	temp = userAgent.match(/version\/(\d+)/i)
  if(temp != null) {
		matchedStr.splice(1, 1, temp[1]);
	}

    return new BrowserInfo(matchedStr[0], matchedStr[1]);
}
