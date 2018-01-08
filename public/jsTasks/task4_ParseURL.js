function MyURL(stringURL) {

  var str = stringURL;
  var m = parseStringURL();

  this.href = m[0];
  this.protocol = m[1];
  this.user = m[2];
  this.password = m[3];
  this.host = m[4];
  this.hostname = m[5];
  this.port = m[6];
  this.path = m[7];
  this.search = m[8];
  this.hash = m[9];

  function parseStringURL() {

    const regex = /(\w*:)\/\/(?:(\w+):(\w+)\@)?(([\w\-\_(\.|\b)]+)(?::([0-9]+))?)(\/[^\s^?^#]*\/?)(\?[^\s^\#\-]+=[^\s^\#]+)?(\#[^]*)?/mg;
    var matches = regex.exec(str);
    return matches;
  }

}

// var u = new MyURL("https://user:pass@sub_.host.com:8080/p/a/t/h?query=string#hash");
// console.log(u);
