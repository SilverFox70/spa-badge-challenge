/*!
 * minQuery
 */
"use strict"

var SweetSelector = {};

 SweetSelector.select = function (cssSelector){
  var firstCharacter = cssSelector.charAt(0)
  switch (firstCharacter) {
  case '.':
    return new SweetResult(document.getElementsByClassName(cssSelector.slice(1)));
  case "#":
    var element = [];
    return new SweetResult([document.getElementById(cssSelector.slice(1))]);
  default:
    return new SweetResult(document.getElementsByTagName(cssSelector));
  }
 }

var MiniQuery = function (cssSelector) {
  return SweetSelector.select(cssSelector);
};

var SweetResult = function (result) {
  this.elements = result;
  this.hide = function() {
    for (var i = 0; i< this.elements.length; i++) {
    this.elements[i].style.display = "none";
    };
  }
  this.show = function() {
    for (var i = 0; i< this.elements.length; i++) {
    this.elements[i].style.display = "initial";
    };
  }
 this.addClass = function(newClassName){
  for (var i = 0; i< this.elements.length; i++) {
    this.elements[i].className += " " + newClassName;
  };
 };
 this.removeClass = function(unwantedClassName){
  for (var i = 0; i< this.elements.length; i++) {
    var old_classes = this.elements[i].className;
    var new_classes = old_classes.replace(unwantedClassName, "");
    this.elements[i].className = new_classes;
  };
 };
  this.on = function(event, action) {
  for (var i = 0; i< this.elements.length; i++) {
    this.elements[i].addEventListener(event, action);
  };
}
  this.trigger = function(event) {
  for (var i = 0; i< this.elements.length; i++) {
    this.elements[i].dispatchEvent(new Event(event));
  }
}

this.request = function(args){
  var x = new Promise(function(resolve,reject){
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open(args.type, args.url);
        oReq.send();
  oReq.onload = function() {
          if (this.status >= 200 && this.status < 300){
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        }
        oReq.onerror = function() {
          reject(this.statusText);
    };
  });
return x;
};

};

var $ = MiniQuery

function reqListener () {
  console.log(this.responseText);
}

// AjaxWrapper = {};
